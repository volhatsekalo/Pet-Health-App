import { Router } from 'express';
const router = Router();
import { login, register, getUserInfo, changePassword, changeUserInfo } from '../controllers/UserController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateRegistration, validateLogin, validateUser } from '../validators/validators.js'
import { errorHandlingForValidation } from '../validators/errorHandlingForValidation.js';

router.post('/register', validateRegistration, errorHandlingForValidation, register);
router.post('/login', validateLogin, errorHandlingForValidation, login);
router.get('/getinfo', verifyToken, getUserInfo);
router.put('/changeinfo', verifyToken, validateUser, errorHandlingForValidation, changeUserInfo);
router.put('/changepassword', verifyToken, changePassword);

export default router;