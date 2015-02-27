exports.definition = {
	config: {
		columns: {
		    "image_ID": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "image_name": "TEXT",
		    "tag_ID": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "gallery_table",
			idAttribute: "image_ID"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};