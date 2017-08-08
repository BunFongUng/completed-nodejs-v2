const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo.model');

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		let title = 'Talking phone with honey';

		request(app)
			.post('/api/todos')
			.send({ title })
			.expect(200)
			.expect(res => {
				expect(res.body.title).toBe(title);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				Todo.find({ _id: res.body._id }).then(todo => {
					expect(todo.title).toBe(title);
				}).catch(err => {

				});
			});
	});
});