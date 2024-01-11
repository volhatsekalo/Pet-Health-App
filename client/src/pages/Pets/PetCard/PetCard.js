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
import { nanoid } from 'nanoid';

const PetCard = ({ classes, content, setPets, tasks }) => {
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

  const [petWeights, setPetWeights] = useState([]);
  const [petTasks, setPetTasks] = useState([]);
  const [status, setStatus] = useState([]);

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
              body: JSON.stringify({...inputData, name}),
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
    setPetTasks(tasks);
  }, [breed, currentWeight, tasks]);

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
        setPetWeights(() => {
          return json.map(xd => {
            return { date: new Date(xd.date), weight: xd.weight }
          });
        })
      }
    }
    fetchWeightData();
  }, [breed, currentWeight]);

  useEffect(() => {
    const generateStatus = async () => {
      const today = new Date();

      const upcomingTasks = petTasks.filter((task) => {
        const twoDays = 2 * 24 * 60 * 60 * 1000; // jeśli za mniej niż dwa dni są zadania do zrobienia
        const taskDate = new Date(task.date).getTime();
        return taskDate - today <= twoDays;
      })

      for (let task of upcomingTasks) {
        if (status.includes('konieczność podania leków') && status.includes('zalecane szczepienia')) {
          break;
        }
        if (task.taskType == 'lek' && !status.includes('konieczność podania leków')) {
          setStatus((prev) => {
            let newArray = [...prev];
            newArray.push('konieczność podania leków');
            return newArray;
          })
        }
        if (task.taskType == 'szczepienie' && !status.includes('zalecane szczepienia')) {
          setStatus((prev) => {
            let newArray = [...prev];
            newArray.push('zalecane szczepienia');
            return newArray;
          })
        }
      }

      if (petWeights.length > 1) {
        const lastWeight = petWeights[petWeights.length - 2].weight;
        const currWeight = petWeights[petWeights.length - 1].weight;
        const weightDiff = Math.abs(lastWeight - currWeight);
        if (weightDiff >= lastWeight * 0.2 && !status.includes('gwałtowna zmiana wagi')) {
          // jesli waga spadla lub wzrosla o wiecej niz 20%
          setStatus((prev) => {
            let newArray = [...prev];
            newArray.push('gwałtowna zmiana wagi');
            return newArray;
          })
        }
      }
      //todo weterynarz

      // jesli lista pusta to daj tam "zdrowy"
      // 'zdrowy', 'wymaga uwagi weterynarza', 'konieczność podania leków', 'gwałtowna zmiana wagi', 'zalecane szczepienia'
    }
    generateStatus();
  }, [petWeights]);


  const changeAvatar = () => {
    if (edit) {

    }
  }


  return (
    <Card classes={classes}>
      <img className="close_logo" src={close} alt="close" onClick={deletePet} />
      {
        edit ?
          <img className="done_logo" src={done} alt="change" onClick={changeDone} /> :
          <img className="change_logo" src={change} alt="change" onClick={changeInfo} />
      }
      <img src={petAvatarUrl ? `http://localhost:3001${petAvatarUrl}` : image} alt={`${name}-info`} className='photo' onDoubleClick={changeAvatar} />
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
          {status.length == 0 ?
            <li>{paw} zdrowy</li> :
            (status.map((st) => {
              return <li key={nanoid(3)}>{paw} {st}</li>
            }))
          }
        </ul>
      </div>
      <div className='pet_weight_diagram'>
        <PetWeightDiagram data={petWeights} />
      </div>
    </Card>
  )
}

export default PetCard;