import { Router } from 'express';
const router = Router();
import { getAllPets, createPet, getPetById, updatePet, deletePet } from '../controllers/PetController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

router.get('/', verifyToken, getAllPets);
router.post('/', verifyToken, createPet);
router.get('/:id', verifyToken, getPetById);
router.put('/:id', verifyToken, updatePet);
router.delete('/:id', verifyToken, deletePet);

export default router;