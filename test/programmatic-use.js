const joiSql = require('../index.js')

joiSql({
	schema: 'pwner',
	table: 'project',
}).then(result => {
	console.log(result)
}).catch(err => {
	process.nextTick(() => {
		throw err
	})
})
