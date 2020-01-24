#!/usr/bin/env node

const joiSql = require(`./index.js`)

const argv = require(`minimist`)(process.argv.slice(2))
joiSql(argv).then(result => {
	console.log(result)
}).catch(err => {
	process.nextTick(() => {
		throw err
	})
})
