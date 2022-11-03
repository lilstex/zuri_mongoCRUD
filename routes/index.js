const { Router } = require('express');
const todo = require('../controllers/index');

const routes = Router();
routes.get('/', todo.welcome);
routes.post('/todo', todo.addTodo);
routes.get('/todo', todo.getAllTodos);
routes.patch('/todo/:id', todo.updateTodo);
routes.delete('/todo/:id', todo.deleteTodo);

module.exports = routes;