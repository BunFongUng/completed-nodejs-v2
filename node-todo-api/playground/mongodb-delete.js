const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoAppV2", (err, db) => {
	if(err) {
		return console.log("Unable to connect to MongoDB");
	}

	let collection = db.collection("Todos");

	// deleteMany
	// collection.deleteMany({title: "watch porn"})
	// 	.then(res => {
	// 		console.log(res.result);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});

	// deleteOne
	// collection.deleteOne({ title: "Play Battefield HardLine" })
	// 	.then(res => {
	// 		console.log(res.result);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});

	// findOneAndDelete
	collection.findOneAndDelete({ _id: ObjectID("597f3ca333b5be0de89d55ea") })
		.then(doc => {
			console.log(doc);
		})
		.catch(err => {
			console.log(err);
		});
});