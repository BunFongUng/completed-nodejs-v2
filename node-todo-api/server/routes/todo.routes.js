const { Router } = require('express');

const todosController = require('../controllers/todosController');

const route = Router();

route.get('/todos', todosController.fetchTodos);

route.post('/todos', todosController.addTodo);

route.get('/todos/:id', todosController.fetchTodoById);

route.delete('/todos/:id', todosController.deleteTodoById);

route.patch('/todos/:id', todosController.updateTodo);

module.exports = {
	todoRoutes: route
 };