import React from 'react';
import { appointments } from '../../dummy-data-home';
import { pets } from '../../dummy-data-pets';
import './Tasks.css';
import AppointmentCard from './AppointmentCard/AppointmentCard';
import { nanoid } from 'nanoid';

function Tasks() {
  return (
    <div className='tasks'>
      <div className='appointment_cards__container'>
        {
          appointments.map((appointmentData) => 
            <AppointmentCard 
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