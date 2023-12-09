import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import RegistrationWindow from '../RegistrationWindow/RegistrationWindow.js';
import LoginWindow from '../LoginWindow/LoginWindow.js';
import logo from "../assets/petcare.png";
import home from "../assets/home.png";
import login from "../assets/login.png";
import register from "../assets/register.png";
import pet from "../assets/pet.png"
import tasks from "../assets/tasks.png"
import './Navbar.css';

function Navbar() {
  const [isLModalOpen, setIsLModalOpen] = useState(false);
  const [isRModalOpen, setIsRModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let navigate = useNavigate();

  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY > 150) {
      setColor(true);
    }
    else {
      setColor(false);
    }
  }

  window.addEventListener('scroll', changeColor);

  return (
    <>
      <nav className={color ? 'navbar navbar_bg' : 'navbar'}>
        <img
          className="navbar__logo"
          onClick={() => {isLoggedIn ? navigate("/zadania") : navigate("/")}}
          src={logo}
          alt=""
        />
        {isLoggedIn ? (
          <ul className={'navbar__list'}>
            <li className='navbar__item'>
              <Link to='/zadania' className='navbar__link'>
                ZADANIA
              </Link>
              <img
                className="navbar__icon"
                onClick={() => setIsLModalOpen(true)}
                src={tasks}
                alt=""
              />
            </li>
            {/* <li className='navbar__item'>
              <Link
                to='/kalendarz'
                className='navbar__link'
              >
                STATYSTYKI
              </Link>
            </li> */}
            <li className='navbar__item'>
              <Link
                to='/zwierzeta'
                className='navbar__link'
              >
                ZWIERZĘTA
              </Link>
              <img
                className="navbar__icon"
                onClick={() => setIsLModalOpen(true)}
                src={pet}
                alt=""
              />
            </li>
            <li className='navbar__item'>
              <Link
                to='/konto'
                className='navbar__link'
              >
                MOJE KONTO
              </Link>
              <img
                className="navbar__icon"
                onClick={() => setIsLModalOpen(true)}
                src={login}
                alt=""
              />
            </li>
          </ul>
        )
          :
          (
            <ul className={'navbar__list'}>
              <li className='navbar__item'>
                <Link to='/' className='navbar__link'>
                  STRONA GŁÓWNA
                </Link>
                <img
                  className="navbar__icon"
                  onClick={() => navigate("/")}
                  src={home}
                  alt=""
                />
              </li>
              <li className='navbar__item'>
                <button className='navbar__link' onClick={() => setIsLModalOpen(true)}>
                  ZALOGUJ
                </button>
                <img
                  className="navbar__icon"
                  onClick={() => setIsLModalOpen(true)}
                  src={login}
                  alt=""
                />
              </li>
              <li className='navbar__item'>
                <button className='navbar__link' onClick={() => setIsRModalOpen(true)}>
                  ZAREJESTRUJ SIĘ
                </button>
                <img
                  className="navbar__icon"
                  onClick={() => setIsRModalOpen(true)}
                  src={register}
                  alt=""
                />
              </li>
              <LoginWindow isOpen={isLModalOpen} onRequestClose={() => setIsLModalOpen(false)} openRegistration={() => setIsRModalOpen(true)} />
              <RegistrationWindow isOpen={isRModalOpen} onRequestClose={() => setIsRModalOpen(false)} openLogin={() => setIsLModalOpen(true)}/>
            </ul>
          )}
      </nav>
    </>
  );
}

export default Navbar;