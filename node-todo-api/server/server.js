const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

try {
	mongoose.connect('mongodb://localhost:27017/TodosAppV2', {
  	useMongoClient: true,
	});
} catch (error) {
	mongoose.createConnection('mongodb://localhost:27017/TodosAppV2', {
  	useMongoClient: true,
		/* other options */
	});
}

mongoose.connection.once('open', () => {
	console.log('MongoDB is running.');
}).on('error', err => {
	throw err;
});

let Todo = mongoose.model('Todo', {
	title: {
		type: String
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: Number
	}
});

let myTodo = new Todo({
	title: 'Learning NodeJS',
	completed: true
});

myTodo.save().then(doc => {
	console.log(doc);
}).catch(err => {
	console.log(err);
});
