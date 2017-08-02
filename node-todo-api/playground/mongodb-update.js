const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoAppV2", (err, db) => {
	if(err) {
		return console.log("Unable to connect MongoDB", err);
	}

	let todoCollection = db.collection('Todos');

	todoCollection.findOneAndUpdate({
		_id: ObjectID("597a05b7bba5ce0ab7ce828e")
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then(result => {
		console.log(result);
	}).catch(err => {
		console.log(err);
	});
});