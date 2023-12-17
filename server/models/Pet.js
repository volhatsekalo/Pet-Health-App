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
        status: {
            type: String,
            required: true,
            enum: ['zdrowy', 'potrzebna jest wizyta u weterynarza', 'trzeba wziąć leki'],
            default: 'zdrowy',
        },
        petAvatarUrl: {
            type: String,
        },
    }
);

export default mongoose.model('Pet', petSchema);