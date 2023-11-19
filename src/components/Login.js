import React, { useState } from 'react';
import './Login.css';

function LoginForm() {
  const [data, setData] = useState({
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
  };

  return (
    <div className='login_form'>
      <form onSubmit={handleSubmit}>
        <h2>Cześć!</h2>
        <h3>Wprowadź swoje dane.</h3>
        <div className='login_form__input'>
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
        <div className='login_form__input'>
          <label className='label' htmlFor="password">Hasło</label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleChange}
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
        <p className="login_form__login">
          Nie masz konta? <a href="/register">Zarejestruj się</a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
