const validator = require('validator');

const jwt = require('jsonwebtoken');

const _ = require('lodash');

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
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not valid email.'
		}
	},
	password: {
		type: String,
		minlength: 6,
		required: true
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

userSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();
	return _.pick(userObject, ['_id', 'email']);
}

userSchema.methods.generateAuthToken = function() {
	let user = this;
	let access = 'auth';

	let token = jwt.sign({
		_id: user._id.toHexString(),
		access
	}, process.env.SECRET_KEY).toString();

	user.tokens.push({
		access,
		token
	});

	return user.save().then(() => token);
}

module.exports = {
	User: mongoose.model('User', userSchema),
};