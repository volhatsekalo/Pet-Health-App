import { Router } from 'express';
const router = Router();
import { getAllPets, createPet, getPetById, updatePet, deletePet, getPetWeightHistory, addPetWeightHistory } from '../controllers/PetController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validatePet, validateWeight, validateUpdatePet } from '../validators/validators.js'
import { errorHandlingForValidation } from '../validators/errorHandlingForValidation.js';

router.get('/', verifyToken, getAllPets); 
router.post('/', verifyToken, validatePet, errorHandlingForValidation, createPet);
router.get('/:id', verifyToken, getPetById);
router.put('/:id', verifyToken, validateUpdatePet, errorHandlingForValidation, updatePet);
router.delete('/:id', verifyToken, deletePet);
router.get('/:id/weights', verifyToken, getPetWeightHistory);
router.post('/:id/weights', verifyToken, validateWeight, errorHandlingForValidation, addPetWeightHistory);


export default router;