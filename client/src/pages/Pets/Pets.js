import React, { useState, useEffect } from 'react';
import PetCard from './PetCard/PetCard';
import './Pets.css';

function Pets() {

  const [pets, setPets] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getAllPets = async () => {
      try {
        const response = await fetch('http://localhost:3001/pets', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();

        if (response.ok) {
          setPets(data);
        }

      } catch (err) {
        console.error('Błąd po stronie serwera:', err);
      }
    };
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

        if (response.ok) {
          setTasks(data);
        }

      } catch (err) {
        console.error('Błąd po stronie serwera:', err);
      }
    }
    getAllPets();
    getAllTasks();
  }, []);

  return (
    <div className='pets'>
      <b>Moje zwierzęta</b>
      {pets.length == 0 ?
        <p>Nie masz jeszcze dodanych zwierząt</p>
        :
        (
          <div className='pet_cards__container'>
            {pets.map((petData) =>
              <PetCard
                classes='pet'
                content={{
                  ...petData
                }}
                setPets={setPets}
                tasks={tasks.filter((task) => task.pet == petData._id)}
                key={petData._id}
              />
            )}
          </div>
        )
      }
      <button className='btn main pets__add'>Dodaj zwierzę</button>
    </div>
  )
}

export default Pets