import React from 'react';
import { appointments } from '../../dummy-data-home';
import { pets } from '../../dummy-data-pets';
import './Tasks.css';
import AppointmentCard from './AppointmentCard/AppointmentCard';
import { nanoid } from 'nanoid';

function Tasks() {
  const sortedAppointments = appointments.sort((a, b) => {
    return new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`);
  });

  return (
    <div className='tasks'>
      <div className='appointment_cards__container'>
        {
          sortedAppointments.map((appointmentData) => 
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