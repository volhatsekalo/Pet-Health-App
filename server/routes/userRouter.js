import { Router } from 'express';
const router = Router();
import { login, register, auth } from '../controllers/UserController.js';

router.post('/login', login);
router.post('/register', register);
router.get('/auth', auth);

export default router;