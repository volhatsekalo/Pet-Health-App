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
            user: req.userId, // z auth()
        });

        await pet.save();

        res.status(200).json({pet});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nie udało się dodać nowego zwierzaka',
        });
    }
}

export const getPetById = () => {

}

export const updatePet = () => {

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
                        deletedPet,
                    });
                }
            })
    }
    catch (error) {
        res.status(500).json({ message: 'Nie udało się usunąć zwierzęcia' });
    }
}