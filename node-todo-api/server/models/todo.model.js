const { mongoose, Schema } = require('../config/dbConfig');

let todoSchema = new Schema({
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
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

let Todo = mongoose.model('Todo', todoSchema);

module.exports = {
	Todo
};