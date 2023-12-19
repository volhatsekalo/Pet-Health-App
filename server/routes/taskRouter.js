import { Router } from 'express';
const router = Router();
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask } from '../controllers/TaskController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

router.get('/', verifyToken, getAllTasks);
router.post('/', verifyToken, createTask);
router.get('/:id', verifyToken, getTaskById);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

export default router;