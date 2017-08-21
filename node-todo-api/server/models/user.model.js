// require('dotenv').config();

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
			validator: (value) => validator.isEmail(value),
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
		access,
	}, process.env.SECRET_KEY).toString();

	user.tokens.push({
		access,
		token
	});

	return user.save().then(() => token);
}

userSchema.statics.findByToken = function(token) {
	let User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, process.env.SECRET_KEY);
	} catch (error) {
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
}

module.exports = {
	User: mongoose.model('User', userSchema),
};