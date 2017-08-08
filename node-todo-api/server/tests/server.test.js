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
				expect(res.body.data.title).toBe(title);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				Todo.find({ _id: res.body.data._id }).then(todo => {
					expect(todo[0].title).toBe(title);
					done();
				}).catch(err => {
					done(err);
				});
			});
	});

	it('should not create todo', (done) => {
		request(app)
			.post('/api/todos')
			.send({})
			.expect(400)
			.end(done);
	});
});