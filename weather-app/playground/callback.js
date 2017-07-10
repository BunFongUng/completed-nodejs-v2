let getUser = (id, callback) => {
    callback(id);
};

getUser(128, (userId) => {
    console.log('User id: ', userId);
});

