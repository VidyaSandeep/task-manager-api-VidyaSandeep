
const {tasks} = require('../models/tasksModel');

// Valid priorities
const validPriorities = ['low', 'medium', 'high'];

// Helper function to validate task input
const validateTaskInput = (title, description, completed, priority) => {
    const errors = [];
    
    // Validate title
    if (!title || typeof title !== 'string' || title.trim() === '') {
        errors.push('Title is required and must be a non-empty string');
    }
    
    // Validate description
    if (!description || typeof description !== 'string' || description.trim() === '') {
        errors.push('Description is required and must be a non-empty string');
    }
    
    // Validate completed status
    if (completed !== undefined && typeof completed !== 'boolean') {
        errors.push('Completed status must be a boolean value (true or false)');
    }
    
    // Validate priority
    if (priority !== undefined && !validPriorities.includes(priority)) {
        errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
    }
    
    return errors;
};

const getTasks = (req, res) => {
    let filteredTasks = [...tasks];
    
    // Filter by completion status if query parameter is provided
    if (req.query.completed !== undefined) {
        const completedValue = req.query.completed === 'true';
        filteredTasks = filteredTasks.filter(t => t.completed === completedValue);
    }
    
    // Sort by creation date (oldest first)
    filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    
    res.status(200).json(filteredTasks);
}

const getTaskById = (req, res) => {
    const taskId = parseInt(req.params.id);
    
    // Validate that id is a valid number
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Task ID must be a valid number' });
    }
    
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
}

const createATask = (req, res) => {
    const { title, description, completed, priority } = req.body;
    
    // Validate input
    const validationErrors = validateTaskInput(title, description, completed, priority);
    if (validationErrors.length > 0) {
        return res.status(400).json({ 
            error: 'Invalid input',
            details: validationErrors 
        });
    }
    
    // Create new task
    const newTask = {
        id: Math.max(...tasks.map(t => t.id), 0) + 1,
        title: title.trim(),
        description: description.trim(),
        completed: completed || false,
        priority: priority || 'medium',
        createdAt: new Date()
    };
    
    tasks.push(newTask);
    res.status(201).json({
        message: 'Task created successfully',
        task: newTask
    });
};

const updateATask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, completed, priority } = req.body;
    
    // Validate that id is a valid number
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Task ID must be a valid number' });
    }
    
    // Find the task
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    // Validate input - at least one field should be provided
    if (!title && !description && completed === undefined && !priority) {
        return res.status(400).json({ 
            error: 'Invalid input',
            details: ['At least one field (title, description, completed, or priority) must be provided']
        });
    }
    
    // Validate provided fields
    const validationErrors = validateTaskInput(
        title || task.title, 
        description || task.description, 
        completed !== undefined ? completed : task.completed,
        priority || task.priority
    );
    if (validationErrors.length > 0) {
        return res.status(400).json({ 
            error: 'Invalid input',
            details: validationErrors 
        });
    }
    
    // Update task
    if (title) task.title = title.trim();
    if (description) task.description = description.trim();
    if (completed !== undefined) task.completed = completed;
    if (priority) task.priority = priority;
    
    res.status(200).json({
        message: 'Task updated successfully',
        task: task
    });
}

const deleteATask = (req, res) => {
    const taskId = parseInt(req.params.id);
    
    // Validate that id is a valid number
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Task ID must be a valid number' });
    }
    
    // Find the task
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    // Delete task
    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json({
        message: 'Task deleted successfully',
        task: deletedTask[0]
    });
};

const getTasksByPriority = (req, res) => {
    const priorityLevel = req.params.level.toLowerCase();
    
    // Validate priority level
    if (!validPriorities.includes(priorityLevel)) {
        return res.status(400).json({ 
            error: 'Invalid priority level',
            details: [`Priority must be one of: ${validPriorities.join(', ')}`]
        });
    }
    
    // Filter tasks by priority
    const priorityTasks = tasks.filter(t => t.priority === priorityLevel);
    
    // Sort by creation date
    priorityTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    
    if (priorityTasks.length === 0) {
        return res.status(200).json({
            message: `No tasks found with priority level: ${priorityLevel}`,
            tasks: []
        });
    }
    
    res.status(200).json({
        message: `Tasks with ${priorityLevel} priority`,
        count: priorityTasks.length,
        tasks: priorityTasks
    });
};

module.exports = {getTasks,
    getTaskById,
    createATask,
    updateATask,
    deleteATask,
    getTasksByPriority
};   