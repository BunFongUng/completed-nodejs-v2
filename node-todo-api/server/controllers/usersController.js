const { ObjectID } = require('mongodb');

const _ = require('lodash');

const { User } = require('../models/user.model');

module.exports = {
	registerUser: (req, res) => {
		let body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password',]);

		User.create(body).then(user => {
			// res.json({
			// 	status: 'success',
			// 	data: user,
			// 	error: null
			// });
			return user.generateAuthToken();
		}).then(token => {
			console.log(token);
			res.send(token);
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
};