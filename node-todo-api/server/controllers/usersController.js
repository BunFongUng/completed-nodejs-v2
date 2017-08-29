const { ObjectID } = require('mongodb');

const _ = require('lodash');

const { User } = require('../models/user.model');

const registerUser = (req, res) => {
	let body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password',]);

	let user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then(token => {
		res.header('x-auth', token).send(user);
	}).catch(err => {
		res.status(400).json({
			status: 'error',
			data: null,
			error: {
				message: err
			}
		});
	});
};

const userLogin = (req, res) => {
	let body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then(user => {
		return user.generateAuthToken().then(token => {
			res.header('x-auth', token).send(user);
		});
	}).catch(err => {
		res.status(400).json({
			status: 'error',
			data: null,
			error: {
				message: err
			}
		});
	});
};

const userProfile = (req, res) => {
	res.json({
		status: 'success',
		data: req.user,
		error: null
	});
};

module.exports = {
	registerUser,
	userProfile,
	userLogin
};