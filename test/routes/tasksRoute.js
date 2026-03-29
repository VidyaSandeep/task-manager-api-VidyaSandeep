const express = require('express');
const router = express.Router();
const {getTasks,getTaskById,createATask,updateATask,deleteATask,getTasksByPriority} = require('../controllers/tasksController');

router.use(express.json());
router.get('/', getTasks);
router.get('/priority/:level', getTasksByPriority);
router.get('/:id', getTaskById);
router.post('/', createATask);
router.put('/:id', updateATask);
router.delete('/:id', deleteATask);

module.exports = router;