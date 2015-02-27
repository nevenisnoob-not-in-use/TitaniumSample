exports.definition = {
	config: {
		columns: {
		    "music_ID": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "music_name": "TEXT",
		    "tag_ID": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "music_table",
			idAttribute: "music_ID"
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