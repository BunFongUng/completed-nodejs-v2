const { ObjectID } = require('mongodb');

const _ = require('lodash');

const { Todo } = require("../models/todo.model");

module.exports = {
	addTodo: (req, res) => {
		let body = _.pick(req.body, ['title']);
		body._creator = req.user._id;

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
		Todo.find({
			_creator: req.user._id
		}).then(todos => {
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
	},
	fetchTodoById: (req, res) => {
		let todoId = req.params.id;
		let _creatorId = req.user._id;

		if(!ObjectID.isValid(todoId)) {
			return res.status(404).json({
				status: 'error',
				message: 'Invalid todo ID'
			});
		}

		Todo.findOne({
			_id: todoId,
			_creator: _creatorId
		}).then(todo => {
			console.log(todo);
			if(!todo) {
				return res.status(404).json({
					status: 'error',
					message: 'Todo not found'
				});
			}

			res.json({
				status: 'success',
				data: todo
			});
		}).catch( err => {
			res.status(400).send(err);
		});
	},
	deleteTodoById: (req, res) => {
		let todoId = req.params.id;
		let _creatorId = req.user._id;

		if(!ObjectID.isValid(todoId)) {
			return res.status(404).json({
				status: 'error',
				message: 'Invalid todo ID'
			});
		}

		Todo.findOneAndRemove({
			_id: todoId,
			_creator: _creatorId
		}).then(todo => {
			if(!todo) {
				return res.status(404).json({
					status: 'error',
					message: 'Todo not found.'
				});
			}

			res.json({
				status: 'success',
				data: {
					message: 'Successfully removed todo'
				}
			});
		}).catch(err => {
			res.status(400).json({
				status: 'error',
				error: err
			});
		});
	},
	updateTodo: (req, res) => {
		let todoId = req.params.id;
		let body = _.pick(req.body, ['title', 'completed']);
		let _creatorId = req.user._id;

		// validate todo id
		if(!ObjectID.isValid(todoId)) {
			return res.status(404).json({
				status: 'error',
				message: 'Invalid todo id'
			});
		}

		// if body.completed is true and body.completed is define
		if(_.isBoolean(body.completed) && body.completed) {
			body.completedAt = new Date().getTime();
		} else {
			body.completed = false;
			body.completedAt = null;
		}

		Todo.findOneAndUpdate({ _id: todoId, _creator: _creatorId}, { $set: body }, { new: true }).then(todo => {
			// if no todo return
			if(!todo) {
				return res.status(404).json({
					status: 'error',
					message: 'Todo not found'
				});
			}

			res.json({
				status: 'success',
				data: todo
			});
		}).catch(err => {
			res.status(400).json({
				status: 'error',
				message: err
			});
		});
	}
};
