require('dotenv').config();

const express = require('express');

const { appMiddlewares } = require('./middlewares/middleware');

const { todoRoutes } = require('./routes/todo.routes');

const { userRoutes } = require('./routes/user.routes');

const PORT = process.env.PORT;

const app = express();

appMiddlewares(app);

app.use('/api', todoRoutes);

app.use('/api', userRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}.`);
});

module.exports = { app };