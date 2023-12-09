import Card from '../../../components/Card/Card';
import './TaskCard.css';

const AppointmentCard = ({ classes, content }) => {
  const { name, type, date, time, description, image } = content;

  const today = new Date();

  const dateArray = date.split("-");
  const year = parseInt(dateArray[0], 10);
  const month = parseInt(dateArray[1], 10) - 1;
  const day = parseInt(dateArray[2], 10);
  const givenDate = new Date(year, month, day);

  const [hours, minutes] = time.split(':');
  const givenTime = new Date();
  givenTime.setHours(hours);
  givenTime.setMinutes(minutes);

  const formateDate = () => {
    if (
      givenDate.getFullYear() === today.getFullYear() &&
      givenDate.getMonth() === today.getMonth() &&
      givenDate.getDate() === today.getDate()
    ) { return "DZISIAJ"; }
    else if (givenDate.getFullYear() === today.getFullYear() &&
      givenDate.getMonth() === today.getMonth() &&
      givenDate.getDate() === today.getDate() + 1) {
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

  return (
    <Card classes={classes}>
      <img src={image} alt={`${name}-appointment`} />
      <div className='text_container'>
        <h3>{name}</h3>
        <p><b>Typ: </b>{type}</p>
        <p><b>Opis: </b>{description}</p>
      </div>
      <div className='appointment__date'>
        <p><b>{formateDate()}</b></p>
        <p><b>{formateTime()}</b></p>
      </div>
    </Card>
  )
}

export default AppointmentCard;