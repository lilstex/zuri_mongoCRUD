const { findOneAndDelete } = require('../models/todo');
const Todo = require('../models/todo');

exports.welcome = (req, res) => {
    res.status(200).send("Welcome to the Zuri ToDo Application");
};

exports.getAllTodos = async (req, res) => {
    try{
        const todos = await Todo.find();
        res.status(200).send({
            status: true,
            message: 'Successful',
            data: todos
        });
    } catch(err) {
        console.log(err);
    }
};

exports.addTodo = async (req, res) => {
    try{
        const { title, description } = req.body;
        // Check if todo already exist with same title
        const checkTodo = await Todo.findOne({title : title});
        if(checkTodo) {
            res.send({
                status: false,
                message: `Todo alraedy exist with this title: ${title}`,
            });
        } else{
            const newTodo = await Todo.create({
                title: title,
                description: description
            });
            res.status(200).send({
                status: true,
                message: 'Successful',
                data: newTodo
            });
        }
    } catch(err) {
        console.log(err);
    }
};

exports.updateTodo = async (req, res) => {
    try{
        const { id } = req.params;
        const todo = await Todo.findOne({_id: id});
        if(todo) {
            todo.title = req.body.title ? req.body.title : todo.title;
            todo.description = req.body.description ? req.body.description : todo.description;
            todo.save();
            res.status(200).send({
                status: true,
                message: 'Successful',
                data: todo
            });
        } else {
            res.send({
                status: true,
                message: 'Todo not found',
            });
        }
    } catch(err) {
        console.log(err);
    }
};

exports.deleteTodo = async (req, res) => {
    try{
        const { id } = req.params;
        const todo = await Todo.findOne({_id: id});
        if(!todo) {
            res.send({
                status: false,
                message: `Todo with ID: ${id}, does not exist`,
            });
        } else {
            await Todo.findOneAndDelete({_id: id});
            res.send({
                status: true,
                message: 'Todo deleted successfully',
            });
        }
    } catch(err) {
        console.log(err);
    }
};