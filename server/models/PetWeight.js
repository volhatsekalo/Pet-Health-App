import mongoose from 'mongoose';

const petWeightSchema = new mongoose.Schema(
    {
        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    }
);

export default mongoose.model('PetWeight', petWeightSchema);