import React, { useState } from 'react';
import './Registration.css';

function RegistrationForm() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Dane z formularza:', data);
  };

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
            minLength="5"
            title="Minimalna długość hasła to 5 znaków"
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
        <p className="registration_form__login">
          Masz już konto? <a href="/register">Zaloguj</a>
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;
