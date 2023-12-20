import { Router } from 'express';
const router = Router();
import { login, register, getUserInfo } from '../controllers/UserController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateRegistration, validateLogin } from '../validators/validators.js'
import { errorHandlingForValidation } from '../validators/errorHandlingForValidation.js';

router.post('/register', validateRegistration, errorHandlingForValidation, register);
router.post('/login', verifyToken, validateLogin, errorHandlingForValidation, login);
router.get('/getInfo', verifyToken, getUserInfo);

export default router;