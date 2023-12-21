import { Router } from 'express';
const router = Router();
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask } from '../controllers/TaskController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateTask } from '../validators/validators.js'
import { errorHandlingForValidation } from '../validators/errorHandlingForValidation.js';

router.get('/', verifyToken, getAllTasks); 
router.post('/', verifyToken, validateTask, errorHandlingForValidation, createTask);
router.get('/:id', verifyToken, getTaskById);
router.put('/:id', verifyToken, validateTask, errorHandlingForValidation, updateTask);
router.delete('/:id', verifyToken, deleteTask);

export default router;