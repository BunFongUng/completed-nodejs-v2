const express = require('express');
const PORT = process.env.PORT || 4200;
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'welcome'
    });
});

app.get('/users', (req, res) => {
    res.status(200).json([
        {
            name: 'Lester',
            age: 25
        },
        {
            name: 'Fong',
            age: 25
        }
    ]);
});

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});

module.exports.app = app;