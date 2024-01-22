import Card from '../../../components/Card/Card';
import close from "../../../assets/close.png";
import image from "../../../assets/pettemplate.jpg"
import done from "../../../assets/done.png"
import './TaskCard.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from 'react';

const TaskCard = ({ classes, content, setTasks, setFilteredTasks }) => {
  const { taskType, date, description, pet, petName, petAvatarUrl, petLastVetVisit, _id } = content;
  const [taskDone, setTaskDone] = useState(false);

  const today = new Date();
  const taskdate = new Date(date);

  const year = taskdate.getFullYear();
  const month = taskdate.getMonth();
  const day = taskdate.getDate();
  const hour = taskdate.getHours();
  const minutes = taskdate.getMinutes();

  const givenDate = new Date(year, month, day);
  const givenTime = new Date();
  givenTime.setHours(hour);
  givenTime.setMinutes(minutes);

  const formateDate = () => {
    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) { return "DZISIAJ"; }
    else if (year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate() + 1) {
      return "JUTRO";
    }
    else {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const formattedDate = new Intl.DateTimeFormat('pl-PL', options).format(givenDate);
      return formattedDate;
    }
  }

  const formateTime = () => {
    return givenTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const deleteTask = async () => {
    try {
      confirmAlert({
        title: 'Usuwanie Zadania',
        message: 'Czy na pewno chcesz usunąć to zadanie?',
        buttons: [
          {
            label: 'Tak',
            onClick: async () => {
              await fetch(`http://localhost:3001/tasks/${_id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                }
              });

              setTasks((prev) => {
                let newArray = [...prev];
                newArray = newArray.filter((task) => task._id != _id);
                setFilteredTasks(() => { return newArray });
                return newArray;
              });
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
      console.error('Błąd przy usuwaniu zadania', err);
    }
  }

  const handleTaskDone = async () => {
    confirmAlert({
      title: 'Oznacz jako zrobione',
      message: 'Czy zadanie zostalo zrobione?',
      buttons: [
        {
          label: 'Tak',
          onClick: async () => {
            if (taskType == 'wizyta u weterynarza') {
              if (!petLastVetVisit || petLastVetVisit < date) {
                await fetch(`http://localhost:3001/pets/${pet}`, {
                  method: 'PUT',
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ lastVetVisit: date }),
                });
              }
            }
            await fetch(`http://localhost:3001/tasks/${_id}`, {
              method: 'DELETE',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              }
            });

            setTasks((prev) => {
              let newArray = [...prev];
              newArray = newArray.filter((task) => task._id != _id);
              setFilteredTasks(() => { return newArray });
              return newArray;
            });
          }
        },
        {
          label: 'Nie',
          onClick: () => { },
        },
      ],
    });
  }

  return (
    <Card classes={taskDone ? `${classes} green_bg` : classes}>
      <img className="close_logo" src={close} alt="close" onClick={deleteTask} />
      <img className="done_logo" src={done} alt="change" onClick={handleTaskDone} />
      <img src={petAvatarUrl ? `http://localhost:3001${petAvatarUrl}` : image} alt={`${petName}-appointment`} className='photo' />
      <div className='text_container'>
        <h3>{petName}</h3>
        <p><b>Typ: </b>{taskType}</p>
        <p><b>Opis: </b>{description}</p>
      </div>
      <div className='task__date'>
        <p><b>{formateDate()}</b></p>
        <p><b>{formateTime()}</b></p>
      </div>
    </Card>
  )
}

export default TaskCard;