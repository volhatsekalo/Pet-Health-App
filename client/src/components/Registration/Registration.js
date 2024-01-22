import React, { useState } from 'react';
import './Registration.css';

function RegistrationForm({ openLogin, onRequestClose }) {
  const [loginMessage, setLoginMessage] = useState('');
  const [cll, setcll] = useState('green');

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        setcll('green');
        setLoginMessage(result.message);
        console.log('Użytkownik zarejestrowany pomyślnie!');
      } else {
        setcll('red');
        setLoginMessage(result.message);
        console.error('Błąd rejestracji:', response.statusText);
      }
    } catch (err) {
      setcll('red');
      setLoginMessage('Błąd po stronie serwera. Spróbuj ponownie później');
      console.error('Błąd po stronie serwera:', err.message);
    }
  };

  const handleClick = () => {
    onRequestClose();
    openLogin();
  }

  return (
    <div className='registration_form'>
      <form onSubmit={handleSubmit}>
        <h3>Witaj w naszej aplikacji do monitorowania zdrowia zwierzaków!</h3>
        <div className='registration_form__input'>
          <label className='label' htmlFor="username">Nazwa użytkownika</label>
          <input
            type="text"
            name="username"
            id="username"
            pattern="^[a-zA-Z0-9]*$"
            title="Nazwa użytkownika powinna się składać z liter lub liczb"
            value={data.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='registration_form__input'>
          <label className='label' htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='registration_form__input'>
          <label className='label' htmlFor="password">Hasło</label>
          <input
            type="password"
            name="password"
            id="password"
            minLength="8"
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).*$"
            title="Hasło ma minimum 8 znaków, w tym jedna cyfra, jedna duża i jedna mała litera oraz jeden znak specjalny"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='registration_form__input'>
          <button className="registration_form__button btn main"
            type="submit"
          >
            ZAREJESTRUJ SIĘ
          </button>
        </div>
        <hr></hr>
        <p>
          Masz już konto? <button className="registration_form__login" onClick={handleClick}>Zaloguj się</button>
        </p>
        <p className={cll}>
          {loginMessage}
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;
