const express = require('express');
const router = express.Router();

const {
    createTodo,
    getSingleTodo,
    getTodos,
    deleteTodo,
    updateTodo
} = require('../Controllers/todoController');

router.get('/', getTodos);
router.get('/:id', getSingleTodo);
router.post('/create', createTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id', updateTodo);

module.exports = router;
