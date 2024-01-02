import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App.js';
import './Login.css';

function LoginForm({ openRegistration, onRequestClose }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [loginMessage, setLoginMessage] = useState('');
  const [loginMessageState, setLoginMessageState] = useState('green');

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setLoginMessageState('green');
        setLoginMessage(result.message);

        const oneMonthInSeconds = 24 * 60 * 60 * 30; // 30 dni
        document.cookie = `accessToken=${result.token}; Secure; SameSite=None;  max-age=${oneMonthInSeconds}`;
        console.log('Użytkownik zalogowany pomyślnie!');
        
        setTimeout(() => {
            // dwa razy sie aktualizuje
          setIsLoggedIn(true);
          window.location.href = '/';
          onRequestClose();
        }, 500);
      }

      else {
        setLoginMessageState('red');
        setLoginMessage(result.message);
        console.error('Błąd logowania:', response.statusText);
      }
    }

    catch (err) {
      setLoginMessageState('red');
      setLoginMessage('Błąd po stronie serwera. Spróbuj ponownie później');
      console.error('Błąd po stronie serwera:', err.message);
    }
  };

  const handleRegisterClick = () => {
    onRequestClose();
    openRegistration();
  }

  return (
    <div className='login_form'>
      <form onSubmit={handleFormSubmit}>
        <h2>Cześć!</h2>
        <h3>Wprowadź swoje dane do logowania.</h3>
        <div className='login_form__input'>
          <label className='label' htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='login_form__input'>
          <label className='label' htmlFor="password">Hasło</label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='login_form__input'>
          <button className="registration_form__button btn main"
            type="submit"
          >
            ZALOGUJ SIĘ
          </button>
        </div>
        <hr></hr>
        <p>
          Nie masz konta? <button className="login_form__register" onClick={handleRegisterClick}>Zarejestruj się</button>
        </p>
        <p className={loginMessageState}>
          {loginMessage}
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
