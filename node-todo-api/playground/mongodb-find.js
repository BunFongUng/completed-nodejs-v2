const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoAppV2", (err, db) => {
	if(err) {
		return console.log("Unable to connect to MongoDB.", err);
	}

	db.collection("Todos").find({
		_id: new ObjectID("5979ec889e58fe2e27595fbb")
	}).toArray()
		.then(docs => {
				console.log(JSON.stringify(docs, undefined, 2));
		})
		.catch(err => {
			console.log(err);
		});
	console.log("Connected to MongoDB");
});