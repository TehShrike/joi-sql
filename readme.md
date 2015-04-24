# joi-sql

Point it at your local database, and it spits out a [Joi](https://github.com/hapijs/joi) object validator.

[![Build Status](https://travis-ci.org/TehShrike/joi-sql.svg)](https://travis-ci.org/TehShrike/joi-sql)

## Usage

Call it from the command-line!

`joi-sql --host=localhost --user=root --password=abc123 --schema=awesomedb --table=customer`

(host and user and password are all optional)

Spits out something like:

```js
Joi.object({
	projectId: Joi.required().invalid(null).integer().max(4294967295).min(0),
	contactId: Joi.required().invalid(null).integer().max(4294967295).min(0),
	dateCreated: Joi.required().invalid(null).date(),
	engineerId: Joi.integer().max(4294967295).min(0),
	name: Joi.required().invalid(null).string().max(200),
	engineeringProject: Joi.required().invalid(null).boolean(),
	printingProject: Joi.required().invalid(null).boolean(),
	activeProjectStateId: Joi.required().invalid(null).integer().max(4294967295).min(0),
	startDate: Joi.date(),
	done: Joi.required().invalid(null).boolean(),
	doneDate: Joi.date(),
	deadReason: Joi.string().max(65535),
	quotedEngineeringHours: Joi.number().precision(1).less(10000),
	actualEngineeringHours: Joi.number().precision(1).less(10000),
	engineeringDueDate: Joi.date(),
	printParts: Joi.string().max(65535),
	printQuantity: Joi.integer().max(8388607).min(-8388608),
	printTimeHours: Joi.number().precision(1).less(10000),
	printDueDate: Joi.date(),
	paymentReceived: Joi.required().invalid(null).boolean(),
	contactDate: Joi.date(),
	replyDate: Joi.date(),
	quoteDate: Joi.date(),
	followUpDate: Joi.date(),
	notes: Joi.string().max(65535),
	version: Joi.required().invalid(null).integer().max(4294967295).min(0)
})
```

Pull requests welcome.

## License

[WTFPL](http://wtfpl2.com/)
