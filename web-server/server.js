const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const routes = require('./routes/routes');
const controllers = require('./controllers/baseController');

const PORT = process.env.PORT || 3333;
const app = express();

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) throw err;
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintain', {
//         message: 'Our website i maintaining.'
//     });
// });

app.set('view engine', 'hbs');

// serving static file.
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', controllers.welcome);
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});

