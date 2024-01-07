import Card from '../../../components/Card/Card';
import close from "../../../assets/close.png";
import image from "../../../assets/pettemplate.jpg"
import './PetCard.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const PetCard = ({ classes, content }) => {
  const paw = <FontAwesomeIcon icon={faPaw} />

  const {name, breed, currentWeight, petAvatarUrl, status } = content;

  return (
    <Card classes={classes}>
      <img className="close_logo" src={close} alt="close" />
      <img src={petAvatarUrl ? `http://localhost:3001${petAvatarUrl}` : image} alt={`${name}-info`} className='photo' />
      <div className='text_container'>
        <h3>{name}</h3>
        <p><b>Rasa: </b>{breed}</p>
        <p><b>Aktualna waga: </b>{currentWeight} kg</p>
        <p><b>Status: </b>
        <ul className='status__list'>
          <li>{paw} {status}</li>
          <li>{paw} wymaga uwagi weterynarza</li>
          <li>{paw} konieczność podania leków</li>
          </ul>
          </p>
      </div>
    </Card>
  )
}

export default PetCard;