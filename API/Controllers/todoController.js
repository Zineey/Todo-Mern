const todoModel = require('../Models/todoModel');
const mongoose = require('mongoose');

// Get all todos
const getTodos = async (req, res) => {
    const user_id = req.user.id;
    try {
        const todos = await todoModel.find({user_id}).sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single todo
const getSingleTodo = async (req, res) => {
    const { id } = req.params;

    // Check if the provided ID is valid 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No todo with that ID' });
    }

    try {
        const todo = await todoModel.findById(id);

        if (!todo) {
            return res.status(404).json({ message: 'No todo with that ID' });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new todo
const createTodo = async (req, res) => {
    const { title, time, completed } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if(!time) {
        emptyFields.push('time');
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ message: 'Please fill in all the fields', emptyFields });
    }

    try {
        const user_id = req.user.id;
        const todo = await todoModel.create({ title, time, completed, user_id });
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No todo with that ID' });
    }

    try {
        await todoModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a todo
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const todo = await todoModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!todo) {
            return res.status(404).json({ error: 'No todo with that ID found' });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTodo,
    getTodos,
    getSingleTodo,
    deleteTodo,
    updateTodo
};
