const toCamelCase = require(`to-camel-case`)

function ifValThen({ column, property, value, then }) {
	const equal = Array.isArray(value) ? value.some(value => {
		return column[property] === value
	}) : column[property] === value

	return equal ? then : ``
}

const maxIntValues = {
	tinyint: 255,
	smallint: 65535,
	mediumint: 16777215,
	int: 4294967295,
	bigint: 18446744073709551615,
}

const getSignedValue = num => (num - 1) / 2
const decimalLessThan = precision => Math.pow(10, precision)
const unrollEnum = col => col.columnType.match(/enum\((.+)\)/)[1]

const checks = [

	intCheck = column => {
		let checks = ``
		if (maxIntValues[column.dataType]) {
			checks += `.number().integer()`

			let min = 0
			let max = maxIntValues[column.dataType]
			if (column.columnType.indexOf(`unsigned`) === -1) {
				max = getSignedValue(max)
				min = -1 * (max + 1)
			}

			checks += `.max(${max}).min(${min})`
		}

		return checks
	},

	dateCheck = column => ifValThen({
		column,
		property: `dataType`,
		value: [ `datetime`, `date`, `timestamp` ],
		then: `.date()`,
	}),

	stringCheck = column => ifValThen({
		column,
		property: `dataType`,
		value: [ `text`, `varchar`, `char` ],
		then: `.string().allow('').max(${column.characterMaximumLength})`,
	}),

	boolCheck = column => (column.dataType === `bit` && column.numericPrecision == `1`) ? `.boolean()` : ``,

	decimalCheck = column => ifValThen({
		column,
		property: `dataType`,
		value: `decimal`,
		then: `.number().precision(${column.numericScale}).less(${decimalLessThan(column.numericPrecision - column.numericScale)})`,
	}),

	enumCheck = column => {
		if (column.dataType === `enum`) {
			return `.any().valid(${unrollEnum(column)})`
		}
		return ``
	},

	nullableCheck = column => {
		if (column.isNullable === `YES`) {
			return `.allow(null)`
		} else if (column.isNullable === `NO`) {
			return `.invalid(null)`
		}
	},

]

module.exports = function(columns, camelCaseProperties) {
	return `Joi.object({\n\t${columns.map(column => {
		const property = camelCaseProperties ? toCamelCase(column.columnName) : column.columnName
		return `${property}: Joi${checks.map(check => check(column)).join(``)}`
	}).join(`,\n\t`)}\n})`
}
