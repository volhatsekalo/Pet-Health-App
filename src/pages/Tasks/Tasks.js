import React from 'react';
import { tasks } from '../../dummy-data-home';
import { pets } from '../../dummy-data-pets';
import './Tasks.css';
import TaskCard from './TaskCard/TaskCard';
import TaskContentControls from './TaskContentControls/TaskContentControls';
import { nanoid } from 'nanoid';

function Tasks() {
  const sortedTasks = tasks.sort((a, b) => {
    return new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`);
  });

  return (
    <div className='tasks'>
      <TaskContentControls />
      <div className='appointment_cards__container'>
        <b>Zaplanowane zadania</b>
        {
          sortedTasks.map((appointmentData) =>
            <TaskCard
              classes='appointment'
              content={{
                ...appointmentData,
                image: pets.find(pet => pet.name === appointmentData.name)?.image,
              }}
              key={nanoid(3)}
            />
          )
        }
      </div>
    </div>
  );
}

export default Tasks