import Card from '../../../components/Card/Card';
import Counter from '../Counter/Counter';
import './AppointmentCard.css';

const AppointmentCard = ({classes, content}) => {
  const { name, type, daysQuantity, description, image } = content;

  return (
    <Card classes={classes}>
      <img src={image} alt={`${name}-appointment`}/>
      <div className='text_container'>
        <h3>{name}</h3> 
        <p><b>Typ: </b>{type}</p>
        <p><b>Opis: </b>{description}</p>
      </div>
      {/* <div className="counter_container">
        <Counter daysQuantity={daysQuantity} />
      </div> */}
    </Card>
  )
}

export default AppointmentCard;