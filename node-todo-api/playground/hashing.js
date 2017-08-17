const jwt = require('jsonwebtoken');

let data = {
	id: 1,
	email: 'lester.ly@pathmazing.com',
	password: '123456'
};

let token = jwt.sign(data, '!@#$%Lester');

// console.log(token);

let decode = jwt.verify(token, '!@#$%Lester');

console.log(decode);