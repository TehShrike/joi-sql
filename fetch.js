const q = require(`sql-concat`)
const camelize = require(`camelize`)

module.exports = (db, { schema, table }) => {
	return new Promise((resolve, reject) => {
		let query = q.select(`column_name`, `data_type`, `column_type`, `numeric_precision`, `numeric_scale`, `character_maximum_length`, `is_nullable`)
			.from(`information_schema.columns`)
			.where(`table_schema`, schema)

		if (table) {
			query = query.where(`table_name`, table)
		}

		db.query(query.build(), (err, columns) => {
			if (err) {
				reject(err)
			} else {
				resolve(camelize(columns))
			}
		})
	})
}
