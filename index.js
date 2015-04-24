var argv = require('minimist')(process.argv.slice(2))

if (typeof argv.schema !== 'string' || typeof argv.table !== 'string') {
	console.error('you must pass in schema and table arguments')
} else {
	var build = require('./build')
	var fetch = require('./fetch')
	var mysql = require('mysql')

	var db = mysql.createConnection({
		host: argv.host || '127.0.0.1',
		user: argv.user || 'root',
		password: argv.password || ''
	})

	fetch(db, { schema: argv.schema, table: argv.table }, function(err, columns) {
		if (err) {
			throw err
		} else {
			console.log(build(columns, argv.camel))
		}
		db.end()
	})
}
