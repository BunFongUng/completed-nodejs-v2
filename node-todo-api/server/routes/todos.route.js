const { Router } = require('express');

const todoController = require('../controllers/todoController');

const route = Router();

route.get('/todos', todoController.fetchTodos);

route.post('/todos', todoController.addTodo);

route.get('/todos/:id', todoController.fetchTodoById);

route.delete('/todos/:id', todoController.deleteTodoById);

route.patch('/todos/:id', todoController.updateTodo);

module.exports = {
	todosRoute: route
 };