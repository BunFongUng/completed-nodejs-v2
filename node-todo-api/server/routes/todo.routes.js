const { Router } = require('express');

const todosController = require('../controllers/todosController');

const { authentication } = require('../middlewares/middleware');

const route = Router();

route.get('/todos', authentication, todosController.fetchTodos);

route.post('/todos', authentication, todosController.addTodo);

route.get('/todos/:id', authentication, todosController.fetchTodoById);

route.delete('/todos/:id', authentication, todosController.deleteTodoById);

route.patch('/todos/:id', authentication, todosController.updateTodo);

module.exports = {
	todoRoutes: route
 };