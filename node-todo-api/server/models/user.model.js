// require('dotenv').config();

const validator = require('validator');

const jwt = require('jsonwebtoken');

const _ = require('lodash');

const bcrypt = require('bcryptjs');

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

userSchema.statics.findByCredentials = function (email, password) {
	let User = this;

	return User.findOne({ email }).then(user => {
		if(!user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if(err || !res) {
					return reject();
				}

				return resolve(user);
			});
		});
	});
}

userSchema.pre('save', function(next) {
	let user = this;

	if(user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

module.exports = {
	User: mongoose.model('User', userSchema),
};