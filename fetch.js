var q = require('sql-concat')
var camelize = require('camelize')

module.exports = function(db, opts, cb) {
	var query = q.select('column_name, data_type, column_type, numeric_precision, numeric_scale, character_maximum_length', 'is_nullable')
		.from('information_schema.columns')
		.where('table_schema', opts.schema)

	if (opts.table) {
		query = query.where('table_name', opts.table)
	}

	var sqlAndParameters = query.build()

	db.query(sqlAndParameters.str, sqlAndParameters.params, function(err, columns) {
		if (err) cb(err)

		cb(null, camelize(columns))
	})
}
