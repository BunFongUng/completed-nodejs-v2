const todoModel = require("../models/todo/todoModel");

module.exports = {
	addTodo: (req, res) => {
		let body = req.body;
		todoModel.Todo.create(body).then(doc => {
			res.status(200).json({
				status: 'success',
				data: doc
			});
		}).catch(err => {s
			console.log();
		});
	}
};
