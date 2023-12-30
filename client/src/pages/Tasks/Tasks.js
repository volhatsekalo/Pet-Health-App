import React, { useState, useEffect } from 'react';
import './Tasks.css';
import TaskCard from './TaskCard/TaskCard';
import TaskContentControls from './TaskContentControls/TaskContentControls';

function Tasks() {
  const [tasks, setTasks] = useState([]);

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
        console.log(data);
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
            const petImage = petData.pet.petAvatarUrl;
            return { ...task, petName };
          } catch (error) {
            console.error('Błąd przy pobieraniu informacji o zwierzaku:', error);
            return task;
          }
        }));
        setTasks(tasksWithPetInfo);
      } catch (err) {
        console.error('Błąd po stronie serwera:', err);
      }
    };
    getAllTasks();
  }, []);


  return (
    <div className='tasks'>
      <TaskContentControls />
      <div className='appointment_cards__container'>
        <b>Zaplanowane zadania</b>
        {
          tasks.map((taskData) =>
            <TaskCard
              classes='appointment'
              content={{
                ...taskData,
              }}
              setTasks={setTasks}
              key={taskData._id}
            />
          )
        }
      </div>
    </div>
  );
}

export default Tasks