import { Router } from 'express';
const router = Router();
import { getAllPets, createPet, getPetById, updatePet, deletePet } from '../controllers/PetController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validatePet } from '../validators/validators.js'
import { errorHandlingForValidation } from '../validators/errorHandlingForValidation.js';

router.get('/', verifyToken, getAllPets); 
router.post('/', verifyToken, validatePet, errorHandlingForValidation, createPet);
router.get('/:id', getPetById);
router.put('/:id', verifyToken, validatePet, errorHandlingForValidation, updatePet);
router.delete('/:id', verifyToken, deletePet);

export default router;