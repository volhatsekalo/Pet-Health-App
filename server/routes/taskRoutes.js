import { Router } from 'express';
const router = Router();
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask } from '../controllers/tasksController';

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;