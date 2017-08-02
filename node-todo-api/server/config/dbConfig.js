const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.Promise = global.Promise;

try {
	mongoose.connect('mongodb://localhost:27017/TodosAppV2', {
  	useMongoClient: true,
	});
} catch (error) {
	mongoose.createConnection('mongodb://localhost:27017/TodosAppV2', {
  	useMongoClient: true,
	});
}

mongoose.connection.once('open', () => {
	console.log('MongoDB is running.');
}).on('error', err => {
	throw err;
});

module.exports = {
	mongoose,
	Schema
};