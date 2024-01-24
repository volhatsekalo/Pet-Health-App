import React, { useState, useEffect } from 'react';
import './Tasks.css';
import TaskCard from './TaskCard/TaskCard';
import TaskContentControls from './TaskContentControls/TaskContentControls';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/tasks', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        const sortedTasks = data.sort((a, b) => new Date(a.date) - new Date(b.date));

        const tasksWithPetInfo = await Promise.all(sortedTasks.map(async task => {
          try {
            const petResponse = await fetch(`http://localhost:3001/pets/${task.pet}`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              }
            });

            const petData = await petResponse.json();
            const petName = petData.pet.name;
            const petLastVetVisit = petData.pet.lastVetVisit;
            const petId = petData.pet._id;
            const petAvatarUrl = petData.pet.petAvatarUrl;

            return { ...task, petName, petId, petAvatarUrl, petLastVetVisit };
          }
          catch (error) {
            console.error('Błąd przy pobieraniu informacji o zwierzaku:', error);
            return task;
          }
        }));
        setTasks(tasksWithPetInfo);
        setFilteredTasks(tasksWithPetInfo);
      } catch (err) {
        console.error('Błąd po stronie serwera:', err);
      }
    };
    getAllTasks();
  }, []);


  return (
    <div className='tasks'>
      <TaskContentControls tasks={tasks} setFilteredTasks={setFilteredTasks} />
      <div className='task_cards__container'>
        <b>Zaplanowane zadania</b>
        {tasks.length === 0 ?
          <p>Nie masz jeszcze dodanych zadań</p> :
          (
            <div>{filteredTasks.map((taskData) =>
              <TaskCard
                classes='task'
                content={{
                  ...taskData
                }}
                setTasks={setTasks}
                setFilteredTasks={setFilteredTasks}
                key={taskData._id}
              />
            )}</div>
          )
        }
      </div>
    </div>
  );
}

export default Tasks