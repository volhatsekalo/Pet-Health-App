import React, { useState, useEffect } from 'react';
import './TaskContentControls.css';
import AddTaskContent from './AddTaskContent/AddTaskContent';
import TaskContentFilters from './TaskContentFilters/TaskContentFilters';

function TaskContentControls({tasks, setFilteredTasks}) {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        const getPets = async () => {
            try {
                const response = await fetch('http://localhost:3001/pets', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const petsData = await response.json();

                const petInfo = petsData.map(pet => {
                    return { id: pet._id, name: pet.name, checked: false };
                })

                setPets(() => {
                    return petInfo;
                });
            }
            catch (err) {
                console.error('Błąd po stronie serwera:', err);
            }
        };
        getPets();
    }, []);

    return (
        <div className='filters__container'>
            <p><b>Dodaj zadanie</b></p>
            <AddTaskContent petsList={pets} />
            <p><b>Filtry</b></p>
            <TaskContentFilters petsList={pets} tasks={tasks} setFilteredTasks={setFilteredTasks}/>
        </div>
    )
}

export default TaskContentControls