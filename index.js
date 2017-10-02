const pFinally = require('p-finally')
const mysql = require('mysql')

const build = require('./build')
const fetch = require('./fetch')

module.exports = argv => {
	const { schema, table, host, user, password, camel, connection } = Object.assign({
		host: '127.0.0.1',
		user: 'root',
		password: '',
	}, argv)

	if (typeof schema !== 'string' || typeof table !== 'string') {
		new Error('you must pass in schema and table arguments')
	} else {
		const db = connection || mysql.createConnection({
			host,
			user,
			password,
		})

		return pFinally(fetch(db, { schema, table }).then(columns => {
			return build(columns, camel)
		}), () => {
			db.end()
		})
	}
}
