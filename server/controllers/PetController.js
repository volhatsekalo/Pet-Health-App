import Pet from '../models/Pet.js';

export const getAllPets = async () => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nie udało się pobrać listy zwierząt',
        });
    }
}

export const createPet = async () => {
    try {
        const { name, breed, status, currentWeight, petAvatarUrl } = req.body;

        const pet = new Pet({
            name,
            breed,
            petAvatarUrl,
            status,
            currentWeight,
            user: req.userId,
        });

        await pet.save();

        res.status(200).json({ pet });
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
        const { name, breed, status, currentWeight, petAvatarUrl } = req.body;
        await Task.findByIdAndUpdate(id, { name, breed, status, currentWeight, petAvatarUrl, user: req.userId }, { new: true })
            .then(updatedPet => {
                if (!updatedPet) {
                    return res.status(404).json({ message: 'Nie znaleziono zwierzęcia o podanym ID' });
                }
                else {
                    return res.status(200).json({
                        message: 'Dane zwierzęcia zostały pomyślnie zaktualizowane',
                        updatedPet
                    });
                }
            })
    }
    catch (err) {
        return res.status(500).json({ message: 'Nie udało się zaktualizować danych zwierzęcia' });
    }
}

export const deletePet = async () => {
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