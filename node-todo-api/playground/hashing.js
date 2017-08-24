const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// let password = '12346';

// bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	})
// });

// let data = {
// 	id: 1,
// 	email: 'lester.ly@pathmazing.com',
// 	password: '123456'
// };

// let token = jwt.sign(data, '!@#$%Lester');

// console.log(token);

// let decode = jwt.verify(token, '!@#$%Lester');

// console.log(decode);

let userObject = {
	_id: '1234',
	access: 'auth'
};



jwt.sign(userObject, '123456nodejs', (err, token) => {
	console.log(token);
});
