import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nie udało się pobrać zadań',
        });
    }
}

export const createTask = (req, res) => {

}

export const getTaskById = (req, res) => {

}

export const updateTask = (req, res) => {

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
    catch (error) {
        res.status(500).json({ message: 'Nie udało się usunąć zadania' });
    }
}
