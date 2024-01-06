import React from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

function Home({ setIsRModalOpen }) {

  const paw = <FontAwesomeIcon icon={faPaw} />;

  return (
    <div className='home'>
      <div className='welcome'>
        <h3 className='welcome__title'>Zadbaj o zdrowie swojego zwierzaka!</h3>
        <ul className='welcome__list'>
          <li className='welcome__list_item'>{paw} Utwórz konto umożliwiające monitorowanie zdrowia pupili</li>
          <li className='welcome__list_item'>{paw} Dostosuj profile swoich zwierząt - dodaj zdjęcie, imię, wagę</li>
          <li className='welcome__list_item'>{paw} Monitoruj szczepienia, wizyty u weterynarza i przyjmowanie leków</li>
          <li className='welcome__list_item'>{paw} Śledź postępy w profilach zwierząt</li>
        </ul>
        <button className='btn main' onClick={() => setIsRModalOpen(true)}>Zarejestruj się</button>
      </div>
    </div>
  );
}

export default Home;