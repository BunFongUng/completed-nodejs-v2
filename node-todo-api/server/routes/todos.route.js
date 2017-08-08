const { Router } = require('express');

const todoController = require('../controllers/todoController');

const route = Router();

route.get('/todos', todoController.fetchTodos);

route.post('/todos', todoController.addTodo);

module.exports = {
	todosRoute: route
 };