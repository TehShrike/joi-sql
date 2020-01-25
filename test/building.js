const assert = require('assert')
const testData = require('./test-column-data')
const build = require('../build')

const actualCamel = build(testData, true)

const expectedCamel = `Joi.object({
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

console.log(actualCamel)

assert.equal(actualCamel, expectedCamel)

const actual = build(testData, false)

const expected = `Joi.object({
	project_id: Joi.number().integer().max(4294967295).min(0).invalid(null),
	contact_id: Joi.number().integer().max(4294967295).min(0).invalid(null),
	date_created: Joi.date().invalid(null),
	engineer_id: Joi.number().integer().max(4294967295).min(0).allow(null),
	name: Joi.string().allow('').max(200).invalid(null),
	engineering_project: Joi.boolean().invalid(null),
	printing_project: Joi.boolean().invalid(null),
	active_project_state_id: Joi.number().integer().max(4294967295).min(0).invalid(null),
	start_date: Joi.date().allow(null),
	done: Joi.boolean().invalid(null),
	done_date: Joi.date().allow(null),
	dead_reason: Joi.string().allow('').max(65535).allow(null),
	quoted_engineering_hours: Joi.number().precision(1).less(10000).allow(null),
	actual_engineering_hours: Joi.number().precision(1).less(10000).allow(null),
	engineering_due_date: Joi.date().allow(null),
	print_parts: Joi.string().allow('').max(65535).allow(null),
	print_quantity: Joi.number().integer().max(8388607).min(-8388608).allow(null),
	print_time_hours: Joi.number().precision(1).less(10000).allow(null),
	print_due_date: Joi.date().allow(null),
	payment_received: Joi.boolean().invalid(null),
	contact_date: Joi.date().allow(null),
	reply_date: Joi.date().allow(null),
	quote_date: Joi.date().allow(null),
	follow_up_date: Joi.date().allow(null),
	notes: Joi.string().allow('').max(65535).allow(null),
	version: Joi.number().integer().max(4294967295).min(0).invalid(null),
	updated_at: Joi.date().invalid(null)
})`

console.log(actual)

assert.equal(actual, expected)