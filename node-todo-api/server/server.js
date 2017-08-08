require('dotenv').config();

const express = require('express');

const { appMiddlewares } = require('./middlewares/middleware');

const { todosRoute } = require('./routes/todos.route');

const PORT = process.env.PORT;

const app = express();

appMiddlewares(app);

app.use('/api', todosRoute)

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}.`);
});

module.exports = { app };