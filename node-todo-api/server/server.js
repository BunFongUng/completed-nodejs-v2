const express = require('express');
const bodyParser = require('body-parser');

const todoController = require('./controllers/todoController');

const PORT = process.env.PORT || 4200;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/todo', todoController.addTodo);

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}.`);
});