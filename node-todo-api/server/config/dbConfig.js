require('dotenv').config();

const mongoose = require('mongoose');

const { Schema } = require('mongoose');

mongoose.Promise = global.Promise;

let env = process.env.NODE_ENV || 'development';

if(env === 'test') {
	process.env.MONGODB_URL = 'mongodb://localhost:27017/TodosAppV2Test';
}

try {
	mongoose.connect(process.env.MONGODB_URL, {
  	useMongoClient: true,
	});
} catch (error) {
	mongoose.createConnection(process.env.MONGODB_URL, {
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