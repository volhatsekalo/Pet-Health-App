import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Nie udało się pobrać zadań',
        });
    }
}

export const createTask = async (req, res) => {
    try {
        const { taskType, description, date, pet } = req.body;

        const task = new Task({
            taskType,
            description,
            date,
            pet,
        });

        await task.save();

        return res.status(200).json({ task });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Nie udało się dodać nowego zadania',
        });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findById(id)
            .then(task => {
                if (!task) {
                    return res.status(404).json({ message: 'Nie znaleziono zadania o podanym ID' });
                }
                else {
                    return res.status(200).json({ message: 'Udało się dodać nowe zadanie', task });
                }
            });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Wystąpił błąd podczas szukania zadania',
        });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { taskType, description, date, pet } = req.body;
        await Task.findByIdAndUpdate(id, { taskType, description, date, pet }, { new: true })
            .then(updatedTask => {
                if (!updatedTask) {
                    return res.status(404).json({ message: 'Nie znaleziono zadania o podanym ID' });
                }
                else {
                    return res.status(200).json({
                        message: 'Dane zadania zostały pomyślnie zaktualizowane',
                        updatedTask
                    });
                }
            })
    }
    catch (err) {
        return res.status(500).json({ message: 'Nie udało się zaktualizować zadania' });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id)
            .then(deletedTask => {
                if (deletedTask) {
                    return res.status(200).json({
                        message: 'Zadanie zostało pomyślnie usunięte',
                        deletedTask,
                    });
                } else {
                    return res.status(404).json({
                        message: 'Nie znaleziono zadania o podanym ID',
                        deletedTask,
                    });
                }
            })
    }
    catch (err) {
        return res.status(500).json({ message: 'Nie udało się usunąć zadania' });
    }
}
