import mongoose from 'mongoose';

const petSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        breed: {
            type: String,
            required: true,
        },
        currentWeight: {
            type: Number,
        },
        // status: {
        //     type: String,
        //     required: true,
        //     enum: ['zdrowy', 'wymaga uwagi weterynarza', 'konieczność podania leków', 'gwałtowna zmiana wagi', 'zalecane szczepienia'],
        //     default: 'zdrowy',
        // },
        lastVetVisit: {
            type: Date,
        },
        petAvatarUrl: {
            type: String,
        },
    }
);

export default mongoose.model('Pet', petSchema);