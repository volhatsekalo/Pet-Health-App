import React, { useState, useEffect } from 'react';
import PetCard from './PetCard/PetCard';
import './Pets.css';
import AddPet from './AddPet/AddPet';
import CustomModal from '../../components/CustomModal/CustomModal';

function Pets() {

  const [pets, setPets] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openAddingModal = () => {
    setIsModalOpen(true);
  }

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
      <button className='btn main pets__add' onClick={openAddingModal}>Dodaj zwierzę</button>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel='Dodawanie zwierzaka'
        className='pets__add_modal'>
        <AddPet setIsModalOpen={setIsModalOpen} setPets={setPets} />
      </CustomModal>
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel='Dodawanie zwierzaka'
        className='pets__add_modal'>
        <AddPet setIsModalOpen={setIsModalOpen} setPets={setPets} />
        <img
          className="close_logo"
          onClick={() => setIsModalOpen(false)}
          src={close}
          alt=""
        />
      </Modal> */}
    </div>
  )
}

export default Pets