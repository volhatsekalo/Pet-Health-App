import Card from '../../../components/Card/Card';
import close from "../../../assets/close.png";
import image from "../../../assets/kot.png"
import './TaskCard.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const TaskCard = ({ classes, content, setTasks }) => {
  const { taskType, date, description, pet, petName, _id } = content;

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

  return (
    <Card classes={classes}>
      <img className="close_logo" src={close} alt="close" onClick={deleteTask} />
      <img src={image} alt={`${petName}-appointment`} className='photo' />
      <div className='text_container'>
        <h3>{petName}</h3>
        <p><b>Typ: </b>{taskType}</p>
        <p><b>Opis: </b>{description}</p>
      </div>
      <div className='appointment__date'>
        <p><b>{formateDate()}</b></p>
        <p><b>{formateTime()}</b></p>
      </div>
    </Card>
  )
}

export default TaskCard;