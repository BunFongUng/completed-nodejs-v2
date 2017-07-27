module.exports = {
    add: (a, b) => a + b,
    square: (x) => x * x,
    setName: (userObject, fullName) => {
        let names = fullName.split(' ');

        userObject.first_name = names[0];
        userObject.last_name = names[1];
        return userObject;
    },
    asyncAdd: (a, b, callback) => {
        setTimeout(() => {
            callback(a + b);
        }, 1000);
    },
    asyncSquare: (x, callback) => {
        setTimeout(() => {
            callback(x * x);
        }, 1000);
    }
};