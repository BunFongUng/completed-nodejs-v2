const { ObjectID } = require('mongodb');

const _ = require('lodash');

const { User } = require('../models/user.model');

module.exports = {
	registerUser: (req, res) => {
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
	},
	userProfile: (req, res) => {
		res.json({
			status: 'success',
			data: req.user,
			error: null
		});
	}
};