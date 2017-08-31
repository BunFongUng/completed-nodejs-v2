const expect = require('expect');

const { ObjectID } = require('mongodb');

const request = require('supertest');

const { app } = require('../server');

const { Todo } = require('../models/todo.model');

const { User } = require('../models/user.model');

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

describe('GET /api/users/me', () => {
	it('should return user if authenticated', done => {
		request(app)
			.get('/api/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect(res => {
				expect(res.body.data._id).toBe(users[0]._id.toHexString());
				expect(res.body.data.email).toBe(users[0].email);
			})
			.end(done);
	});

	it('should return 401 if not authenticated', done => {
		request(app)
			.get('/api/users/me')
			.expect(401)
			.expect(res => {
				expect(res.body.error.message).toBe('Unauthorized');
			})
			.end(done);
	});
});

describe('POST /api/users', () => {
	it('should create a user', done => {
		let firstName = 'testing';
		let lastName = 'last';
		let email = 'testing@example.com';
		let password = '123456';

		request(app)
			.post('/api/users')
			.send({firstName, lastName,email, password})
			.expect(200)
			.expect(res => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
			})
			.end(err => {
				if(err) return done(err);

				User.findOne({email}).then(user => {
					expect(user).toExist();
					expect(user._id).toNotBe(password);
					done();
				});
			});
	});

	it('should return validation error message if request invalid', done => {
		let email = 'test1';
		let password = '1';

		request(app)
			.post('/api/users')
			.send({email, password})
			.expect(400)
			.end(done);
	});

	it('should not create user if email in use', done => {
		let firstName = 'testing';
		let lastName = 'last';
		let email = 'testing@example.com';
		let password = '123456';

		request(app)
			.post('/api/users')
			.send({email, password})
			.expect(400)
			.end(done);
	});
});

describe('POST /api/users/login', () => {
	it('should login user and return auth token', done => {
		let email = users[0].email;
		let password = users[0].password;

		request(app)
			.post('/api/users/login')
			.send({email, password})
			.expect(200)
			.expect(res => {
				expect(res.headers['x-auth']).toExist();
			})
			.end(done);
	});

	it('should reject invalid login', done => {
		let email = users[1].email;
		let password = users[1].password + '1234';

		request(app)
			.post('/api/users/login')
			.send({ email, password })
			.expect(400)
			.end(done);
	});
});