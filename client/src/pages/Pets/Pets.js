import React, { useState, useEffect } from 'react';
import PetCard from './PetCard/PetCard';
import './Pets.css';

function Pets() {

  const [pets, setPets] = useState([]);

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
    getAllPets();
  }, []);

  return (
    <div className='pets'>
      <div className='pet_cards__container'>
              {pets.map((petData) =>
          <PetCard
            classes='pet'
            content={{
              ...petData
            }}
            key={petData._id}
          />
        )}
      </div>
    </div>
  )
}

export default Pets