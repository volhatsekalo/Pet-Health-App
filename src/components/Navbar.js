import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import RegistrationWindow from './RegistrationWindow.js';
import LoginWindow from './LoginWindow.js';
import logo from "../assets/petcare.png";
import home from "../assets/home.png";
import login from "../assets/login.png";
import register from "../assets/register.png";
import './Navbar.css';

function Navbar() {
  const [isLModalOpen, setIsLModalOpen] = useState(false);
  const [isRModalOpen, setIsRModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          onClick={() => navigate("/")}
          src={logo}
          alt=""
        />
        {isLoggedIn ? (
          <ul className={'navbar__list'}>
            <li className='navbar__item'>
              <Link to='/' className='navbar__link'>
                STRONA GŁÓWNA
              </Link>
            </li>
            <li className='navbar__item'>
              <Link
                to='/kalendarz'
                className='navbar__link'
              >
                KALENDARZ
              </Link>
            </li>
            <li className='navbar__item'>
              <Link
                to='/zywienie'
                className='navbar__link'
              >
                ŻYWIENIE
              </Link>
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
              <LoginWindow isOpen={isLModalOpen} onRequestClose={() => setIsLModalOpen(false)} />
              <RegistrationWindow isOpen={isRModalOpen} onRequestClose={() => setIsRModalOpen(false)} />
            </ul>
          )}
      </nav>
    </>
  );
}

export default Navbar;