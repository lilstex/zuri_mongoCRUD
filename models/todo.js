const mongoose = require('mongoose');

const todo = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title required"],
        },
        description: {
            type: String,
            required: [true, "description required"],
        },
    },
    {
        timestamps: true 
    }
);

const Todo = mongoose.model('Todo', todo);
module.exports = Todo;