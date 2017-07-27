const expect = require('expect');
const rewire = require('rewire');

let app = rewire('./app');

describe('App', () => {
	let db = {
		saveUser: expect.createSpy()
	};

	app.__set__('db', db);

	it("should call saveUser with user object", () => {
		let email = "lester.ly@pathmazing.com";
		let password = "123456";

		app.handleSignUp(email, password);

		expect(db.saveUser).toHaveBeenCalledWith({email, password});
	});
});