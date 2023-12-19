import { Router } from 'express';
const router = Router();
import { login, register, getme } from '../controllers/UserController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

router.post('/login', verifyToken, login);
router.post('/register', register);
router.get('/getMe', getMe);

export default router;