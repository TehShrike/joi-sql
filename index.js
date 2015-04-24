var build = require('./build')
var fetch = require('./fetch')
var mysql = require('mysql')

var db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: ''
})

fetch(db, { schema: 'pwner', table: 'project' }, function(err, columns) {
	if (err) {
		throw err
	} else {
		console.log(build(columns, true))
	}
})
