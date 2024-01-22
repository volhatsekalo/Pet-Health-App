import Pet from '../models/Pet.js';
import PetWeight from '../models/PetWeight.js';

export const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find({ user: req.userId });
        return res.status(200).json(pets);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nie udało się pobrać listy zwierząt',
        });
    }
}

export const createPet = async (req, res) => {
    try {
        const { name, breed, currentWeight, petAvatarUrl } = req.body;

        const pet = new Pet({
            name,
            breed,
            petAvatarUrl,
            currentWeight,
            user: req.userId,
        });

        await pet.save();

        res.status(200).json({ message: 'Udało się dodać nowego zwierzaka', pet });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nie udało się dodać nowego zwierzaka',
        });
    }
}

export const getPetById = async (req, res) => {
    try {
        const { id } = req.params;
        await Pet.findById(id)
            .then(pet => {
                if (!pet) {
                    return res.status(404).json({ message: 'Nie znaleziono zwierzęcia o podanym ID' });
                }
                else {
                    return res.status(200).json({ pet });
                }
            });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Wystąpił błąd podczas szukania zwierzęcia',
        });
    }
}

export const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const { breed, currentWeight, lastVetVisit, petAvatarUrl } = req.body;
        const updateFields = {};

        if (breed && currentWeight) {
            updateFields.breed = breed;
            updateFields.currentWeight = currentWeight;
        }

        if (lastVetVisit) {
            updateFields.lastVetVisit = lastVetVisit;
        }

        if (petAvatarUrl) {
            updateFields.petAvatarUrl = petAvatarUrl;
        }

        await Pet.findByIdAndUpdate(id, updateFields, { new: true })
            .then(updatedPet => {
                if (!updatedPet) {
                    return res.status(404).json({ message: 'Nie znaleziono zwierzęcia o podanym ID' });
                }
            })

        if (currentWeight) {
            const newWeight = new PetWeight({
                pet: id,
                date: new Date(),
                weight: currentWeight
            });

            await newWeight.save().
                then(updatedWeight => {
                    if (!updatedWeight) {
                        return res.status(400).json({ message: 'Nie udalo sie dodac nowej wagi do bazy danych' });
                    }
                })
        }

        return res.status(200).json({
            message: 'Dane zwierzęcia zostały pomyślnie zaktualizowane'
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Nie udało się zaktualizować danych zwierzęcia' });
    }
}

export const deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        await Pet.findByIdAndDelete(id)
            .then(deletedPet => {
                if (deletedPet) {
                    return res.status(200).json({
                        message: 'Zwierzę zostało pomyślnie usunięte',
                        deletedPet,
                    });
                } else {
                    return res.status(404).json({
                        message: 'Nie znaleziono zwierzęcia o podanym ID',
                    });
                }
            })
    }
    catch (error) {
        res.status(500).json({ message: 'Nie udało się usunąć zwierzęcia' });
    }
}

export const getPetWeightHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const petWeights = await PetWeight.find({ pet: id });
        return res.status(200).json(petWeights);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nie udało się pobrać listy wag',
        });
    }
}

export const addPetWeightHistory = async (req, res) => {
    try {
        const { currentWeight, pet } = req.body;

        const petWeight = new PetWeight({
            pet,
            weight: currentWeight,
            date: new Date()
        });

        await petWeight.save();

        res.status(200).json({ message: 'Udało się dodać wagę zwierzaka', pet });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nie udało się dodać wagi zwierzaka',
        });
    }
}