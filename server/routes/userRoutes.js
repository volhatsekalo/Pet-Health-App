import { Router } from 'express';
const router = Router();
import { login, register, auth } from '../controllers/usersController';

router.post('/login', login);
router.post('/register', register);
router.get('/auth', auth);

export default router;