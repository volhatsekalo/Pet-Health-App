import { Router } from 'express';
const router = Router();
import { getAllPets, createPet, getPetById, updatePet, deletePet } from '../controllers/PetController.js';

router.get('/', getAllPets);
router.post('/', createPet);
router.get('/:id', getPetById);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;