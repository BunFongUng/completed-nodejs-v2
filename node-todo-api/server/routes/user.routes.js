const { Router } = require('express');

const usersController = require('../controllers/usersController');

const { authentication } = require('../middlewares/middleware');

const validate = require('express-validation');

const { signUp } = require('../validation/users.validation');

const route = Router();

route.post('/users', validate(signUp), usersController.registerUser);

route.get('/users/me', authentication, usersController.userProfile);

module.exports = {
	userRoutes: route
};