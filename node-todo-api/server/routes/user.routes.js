const { Router } = require('express');

const usersController = require('../controllers/usersController');

const route = Router();

route.post('/users', usersController.registerUser);

module.exports = {
	userRoutes: route
};