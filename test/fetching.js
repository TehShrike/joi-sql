const fetch = require('../fetch')
const mysql = require('mysql')

const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
})

fetch(db, { schema: 'pwner', table: 'project' }).then(columns => {
	console.log(columns)
}).catch(err => {
	process.nextTick(() => {
		throw err
	})
})
