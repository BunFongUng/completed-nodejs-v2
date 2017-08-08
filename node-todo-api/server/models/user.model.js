const { mongoose, Schema } = require('../config/dbConfig');

let userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
		minlength: 2,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		minlength: 2,
	},
	email: {
		type: String,
		trim: true,
		minlength: 3,
		required: true,
	}
});

module.exports = {
	User: mongoose.model('User', userSchema),
};