var toCamelCase = require('to-camel-case')

function ifValThen(column, property, value, then) {
	var equal = Array.isArray(value) ? value.some(function(value) { return column[property] === value}) : column[property] === value

	return equal ? then : ''
}

var maxIntValues = {
	tinyint: 255,
	smallint: 65535,
	mediumint: 16777215,
	int: 4294967295,
	bigint: 18446744073709551615
}

function getSignedValue(num) {
	return (num - 1) / 2
}

function decimalLessThan(precision) {
	return Math.pow(10, precision)
}

function unrollEnum(col) {
	return col.columnType.match(/enum\((.+)\)/)[1]
}

var checks = [

	function intCheck(column) {
		var checks = ''
		if (maxIntValues[column.dataType]) {
			checks += '.number().integer()'

			var min = 0
			var max = maxIntValues[column.dataType]
			if (column.columnType.indexOf('unsigned') === -1) {
				max = getSignedValue(max)
				min = -1 * (max + 1)
			}

			checks += '.max(' + max + ').min(' + min + ')'
		}

		return checks
	},

	function dateCheck(column) {
		return ifValThen(column, 'dataType', ['datetime', 'date', 'timestamp'], '.date()')
	},

	function stringCheck(column) {
		return ifValThen(column, 'dataType', ['text', 'varchar', 'char'], '.string().max(' + column.characterMaximumLength + ')')
	},

	function boolCheck(column) {
		return (column.dataType === 'bit' && column.numericPrecision == '1') ? '.boolean()' : ''
	},

	function decimalCheck(column) {
		return ifValThen(column, 'dataType', 'decimal', '.number().precision('
			+ column.numericScale + ').less(' + decimalLessThan(column.numericPrecision - column.numericScale) + ')')
	},

	function enumCheck(column) {
		if (column.dataType === 'enum') {
			return '.any().valid(' + unrollEnum(column) + ')'
		}
		return ''
	},

	function nullableCheck(column) {
		if (column.isNullable === 'YES') {
			return '.allow(null)'
		} else if (column.isNullable === 'NO') {
			return '.invalid(null)'
		}
	}

]

module.exports = function(columns, camelCaseProperties) {
	return 'Joi.object({\n\t' + columns.map(function(column) {
		var property = camelCaseProperties ? toCamelCase(column.columnName) : column.columnName
		return property + ': Joi' + checks.map(function(check) {
			return check(column)
		}).join('')
	}).join(',\n\t') + '\n})'
}
