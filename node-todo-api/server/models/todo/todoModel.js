const dbConfig = require('../../config/dbConfig');

let todoSchema = new dbConfig.Schema({
	title: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	completedAt: {
		type: Number,
		default: Date.now,
	}
});

let Todo = dbConfig.mongoose.model('Todo', todoSchema);

module.exports = {
	Todo
};