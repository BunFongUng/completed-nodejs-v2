const { MongoClient } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoAppV2", (err, db) => {
  if (err) {
    return console.log("Can not connect to MongoDB");
  }

  // db.collection('Todos').insertOne({
  // 	title: 'Learning NodeJs',
  // 	completed: false
  // }, (err, result) => {
  // 	if(err) {
  // 		return console.log("Unable to insert data.");
  // 	}

  // 	console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection("Users").insertOne({
    userName: "Lester",
    email: "lester.ung@pathmazing.com"
  }, (err, result) => {
    if (err) {
      return console.log("Unable to insert user data");
    }

		console.log(JSON.stringify(result.ops, undefined, 2));
		console.log(result.ops[0]._id.getTimestamp());
  });

  console.log("Connected to MongoDB");
});
