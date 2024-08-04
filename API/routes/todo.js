const express = require('express');
const router = express.Router();
const requireAuth = require('../Middleware/requireAuth');
const {
    createTodo,
    getSingleTodo,
    getTodos,
    deleteTodo,
    updateTodo
} = require('../Controllers/todoController');


// Middleware
router.use(requireAuth);

// Routes
router.get('/', getTodos);
router.get('/:id', getSingleTodo);
router.post('/create', createTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id', updateTodo);

module.exports = router;
