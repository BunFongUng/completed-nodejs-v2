const welcome = (req, res) => {
    let data = [
        {
            name: 'Lester',
            age: 25
        },
        {
            name: 'Hacker',
            age: 28
        }
    ];
    res.render('welcome', {
        title: 'Welcome',
        message: 'to our web service.',
        data
    });
};

const index = (req, res) => {
    res.send({
        'status' : 'success',
        'message' : 'Welcome to Rest API'
    });
};

module.exports = {
    welcome,
    index,
};