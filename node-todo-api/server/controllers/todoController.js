const { Todo } = require("../models/todo.model");

module.exports = {
	addTodo: (req, res) => {
		let body = req.body;

		Todo.create(body).then(doc => {
			res.status(200).json({
				status: 'success',
				data: doc
			});
		}).catch(err => {
			res.status(400).send(err);
		});
	},
	fetchTodos: (req, res) => {
		Todo.find().then(todos => {
			res.json({
				status: 'success',
				data: todos
			});
		}).catch(err => {
			res.status(400).json({
				status: 'error',
				message: err
			});
		});
	}
};
