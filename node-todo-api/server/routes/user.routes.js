const { Router } = require('express');

const usersController = require('../controllers/usersController');

const { authentication } = require('../middlewares/middleware');

const route = Router();

route.post('/users', usersController.registerUser);

route.get('/users/me', authentication, usersController.userProfile);

module.exports = {
	userRoutes: route
};