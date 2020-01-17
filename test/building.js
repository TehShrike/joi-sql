const assert = require('assert')
const testData = require('./test-column-data')
const build = require('../build')

const camel = true
const actual = build(testData, camel)

const expected = `Joi.object({
	projectId: Joi.number().integer().max(4294967295).min(0).invalid(null),
	contactId: Joi.number().integer().max(4294967295).min(0).invalid(null),
	dateCreated: Joi.date().invalid(null),
	engineerId: Joi.number().integer().max(4294967295).min(0).allow(null),
	name: Joi.string().allow('').max(200).invalid(null),
	engineeringProject: Joi.boolean().invalid(null),
	printingProject: Joi.boolean().invalid(null),
	activeProjectStateId: Joi.number().integer().max(4294967295).min(0).invalid(null),
	startDate: Joi.date().allow(null),
	done: Joi.boolean().invalid(null),
	doneDate: Joi.date().allow(null),
	deadReason: Joi.string().allow('').max(65535).allow(null),
	quotedEngineeringHours: Joi.number().precision(1).less(10000).allow(null),
	actualEngineeringHours: Joi.number().precision(1).less(10000).allow(null),
	engineeringDueDate: Joi.date().allow(null),
	printParts: Joi.string().allow('').max(65535).allow(null),
	printQuantity: Joi.number().integer().max(8388607).min(-8388608).allow(null),
	printTimeHours: Joi.number().precision(1).less(10000).allow(null),
	printDueDate: Joi.date().allow(null),
	paymentReceived: Joi.boolean().invalid(null),
	contactDate: Joi.date().allow(null),
	replyDate: Joi.date().allow(null),
	quoteDate: Joi.date().allow(null),
	followUpDate: Joi.date().allow(null),
	notes: Joi.string().allow('').max(65535).allow(null),
	version: Joi.number().integer().max(4294967295).min(0).invalid(null),
	updatedAt: Joi.date().invalid(null)
})`

console.log(actual)

assert.equal(actual, expected)
