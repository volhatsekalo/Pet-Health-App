import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        taskType: {
            type: String,
            required: true,
            enum: ['lek', 'wizyta u weterynarza', 'szczepienie'],
        },
        description: {
            type: String,
            default: "",
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
            required: true,
        },
    },
);

export default mongoose.model('Task', taskSchema);