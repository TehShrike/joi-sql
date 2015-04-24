var q = require('sql-concat')
var camelize = require('camelize')

module.exports = function(db, opts, cb) {
	var query = q.select('table_catalog, table_schema, table_name, column_name, ordinal_position, column_default, is_nullable, data_type, character_maximum_length, character_octet_length, numeric_precision, numeric_scale, datetime_precision, character_set_name, collation_name, column_type, column_key, extra, privileges, column_comment')
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
