const { ObjectID } = require("mongodb");
const jwt = require('jsonwebtoken');
const { Todo } = require("./../../models/todo.model");
const { User } = require("./../../models/user.model");

let todos = [
  {
    _id: new ObjectID(),
    title: "todo test 1"
  },
  {
    _id: new ObjectID(),
    title: "todo test 2"
  }
];

let populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

let user1Id = new ObjectID();
let user2Id = new ObjectID();
let secretKey = '!node&js*todo~appy';

let users = [{
	_id: user1Id,
	firstName: 'user1 firstName',
	lastName: 'user1 lastName',
	email: 'user1@example.com',
	password: 'user1_password',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: user1Id, access: 'auth'}, secretKey)
	}]
}, {
	_id: new ObjectID(),
	firstName: 'user2 firstName',
	lastName: 'user2 lastName',
	email: 'user2@example.com',
	password: 'user2_password',
}]

populateUsers = done => {
	User.remove({})
		.then(() => {
			let user1 = new User(users[0]).save();
			let user2 = new User(users[1]).save();
			return Promise.all([user1, user2]);
		})
		.then(() => done());
}

module.exports = {
	todos,
	users,
	populateTodos,
	populateUsers
};
