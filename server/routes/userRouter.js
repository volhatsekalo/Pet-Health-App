import { Router } from 'express';
const router = Router();
import { login, register, getUserInfo } from '../controllers/UserController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

router.post('/register', register);
router.post('/login', verifyToken, login);
router.get('/getMe', verifyToken, getUserInfo);

export default router;