const expect = require('expect');

const { ObjectID } = require('mongodb');

const request = require('supertest');

const { app } = require('../server');

const { Todo } = require('../models/todo.model');

const {todos, users, populateTodos, populateUsers} = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

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

describe('GET /todos', () => {
	it('should get all todos', done => {
		request(app)
			.get('/api/todos')
			.expect(200)
			.expect(res => {
				expect(res.body.data.length).toBe(2);
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('should get todo', done => {
		request(app)
			.get(`/api/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect(res => {
				expect(res.body.data.title).toBe(todos[0].title)
			})
			.end(done);
	});

	it('should return 404 if todo not found', done => {
		request(app)
			.get(`/api/todos/598c76aebaaa24594fb4d371`)
			.expect(404)
			.end(done);
	});

	it('should return 404 if todo is invalid', done => {
		request(app)
			.get('/api/todos/123sd')
			.expect(404)
			.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('should delete todo by the specific id', done => {
		request(app)
			.delete(`/api/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect(res => {
				expect(res.body.data.message).toBe('Successfully removed todo');
			})
			.end(done);
	});

	it('should return 404 if todo id not found', done => {
		request(app)
			.delete(`/api/todos/598c76aebaaa24594fb4d371}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 if todo id is invalid', done => {
		request(app)
			.delete('/api/todos/1234')
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id', () => {
	it('should update a todo', done => {
		request(app)
			.patch(`/api/todos/${todos[0]._id}`)
			.send({
				title: 'Todo test 1 updated title',
				completed: true
			})
			.expect(200)
			.expect(res => {
				expect(res.body.data.completed).toBe(true);
			})
			.end(done);
	});

	it('should return 404 if todo id not found', done => {
		request(app)
			.patch(`/api/todos/598c76aebaaa24594fb4d371`)
			.send({ completed: true })
			.expect(404)
			.end(done);
	});

	it('should return 404 if todo id is invalid', done => {
		request(app)
			.patch('/api/todos/123412313')
			.send({ completed: false })
			.expect(404)
			.end(done);
	});

});

// console.log(users[0]);

// describe('POST /api/users', () => {
// 	it('signup new user with generated token', done => {
// 		request(app)
// 			.post('/api/users')
// 			.send(users[0])
// 			.expect(200)
// 			.expect((res) => {
// 				console.log('POST /api/user response', res);
// 				expect(res.body.firstName).toBe('user1 firstName');
// 			})
// 			.end(done);
// 	});
// });