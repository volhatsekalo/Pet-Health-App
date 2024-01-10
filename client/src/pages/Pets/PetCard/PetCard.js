import { React, useState, useEffect } from 'react';
import Card from '../../../components/Card/Card';
import close from "../../../assets/close.png";
import change from "../../../assets/pencil.png"
import done from "../../../assets/done.png"
import image from "../../../assets/pettemplate.jpg"
import './PetCard.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import PetWeightDiagram from '../PetWeightDiagram/PetWeightDiagram';

const PetCard = ({ classes, content, setPets }) => {
  const paw = <FontAwesomeIcon icon={faPaw} />

  const { _id, name, breed, currentWeight, petAvatarUrl } = content;
  const [edit, setEdit] = useState(false);
  const [inputData, setInputData] = useState({
    breed: '',
    currentWeight: '',
  });
  const [data, setData] = useState({
    breed: '',
    currentWeight: '',
  });

  const [petWeights, setPetWeights] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setInputData({
      ...data,
      [name]: value,
    });
  };

  const changeInfo = () => {
    setEdit(true);
  }

  const changeDone = () => {
    confirmAlert({
      title: 'Zmiana danych zwierzęcia',
      message: 'Czy na pewno chcesz zaktualizować dane?',
      buttons: [
        {
          label: 'Tak',
          onClick: async () => {
            const response = await fetch(`http://localhost:3001/pets/${_id}`, {
              method: 'PUT',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(inputData),
            });

            if (response.ok) {
              setData(inputData);
            }
          }
        },
        {
          label: 'Nie',
          onClick: () => { },
        },
      ],
    });
    setEdit(false);
  }

  const deletePet = async () => {
    try {
      confirmAlert({
        title: 'Usuwanie Zwierzęcia',
        message: 'Czy na pewno chcesz usunąć to zwierzę?',
        buttons: [
          {
            label: 'Tak',
            onClick: async () => {
              const response = await fetch(`http://localhost:3001/pets/${_id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                }
              });

              if (response.ok) {
                setPets((prev) => {
                  let newArray = [...prev];
                  newArray = newArray.filter((pet) => pet._id != _id);
                  return newArray;
                })
              }
            }
          },
          {
            label: 'Nie',
            onClick: () => { },
          },
        ],
      });

    }
    catch (err) {
      console.error('Błąd przy usuwaniu zwierzęcia', err);
    }
  }

  useEffect(() => {
    setInputData({
      breed: breed,
      currentWeight: currentWeight,
    });
    setData({
      breed: breed,
      currentWeight: currentWeight,
    });
  }, [breed, currentWeight]);

  useEffect(() => {
    const fetchWeightData = async () => {
      const response = await fetch(`http://localhost:3001/pets/${_id}/weights`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const json = await response.json();
        setPetWeights(json.map(xd => { return { date: new Date(xd.date), weight: xd.weight } }));
      }
    }
    fetchWeightData();
  }, [breed, currentWeight]);

  return (
    <Card classes={classes}>
      <img className="close_logo" src={close} alt="close" onClick={deletePet} />
      {
        edit ?
          <img className="done_logo" src={done} alt="change" onClick={changeDone} /> :
          <img className="change_logo" src={change} alt="change" onClick={changeInfo} />
      }
      <img src={petAvatarUrl ? `http://localhost:3001${petAvatarUrl}` : image} alt={`${name}-info`} className='photo' />
      <div className='text_container'>
        <h3>{name}</h3>
        <p><b>Rasa: </b>{edit ?
          (<input
            type="text"
            name="breed"
            value={inputData.breed}
            onChange={handleInputChange}
            className="petinfo__input"
          />) : <span>{data.breed}</span>}</p>
        <p><b>Aktualna waga: </b>{edit ?
          (<input
            type="text"
            name="currentWeight"
            value={inputData.currentWeight}
            onChange={handleInputChange}
            className="petinfo__input"
          />) : <span>{data.currentWeight}</span>} kg</p>
        <p><b>Status: </b></p>
        <ul className='status__list'>
          <li>{paw} wymaga uwagi weterynarza</li>
          <li>{paw} konieczność podania leków</li>
        </ul>
      </div>
      <div className='pet_weight_diagram'>
        <PetWeightDiagram data={petWeights} />
      </div>
    </Card>
  )
}

export default PetCard;