import React, { useState } from 'react';
import './Login.css';

function LoginForm({ openRegistration, onRequestClose }) {
  const [loginMessage, setLoginMessage] = useState('');
  const [cll, setcll] = useState('green');

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

  const handleSubmit = async (event) => {
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
        setcll('green');
        setLoginMessage(result.message);
        const cookieHeader = response.headers.get('Set-Cookie');
        document.cookie = cookieHeader;
        console.log('Użytkownik zalogowany pomyślnie!');
      } else {
        setcll('red');
        setLoginMessage(result.message);
        console.error('Błąd logowania:', response.statusText);
      }
    } catch (err) {
      setcll('red');
      setLoginMessage('Błąd po stronie serwera. Spróbuj ponownie później');
      console.error('Błąd po stronie serwera:', err.message);
    }
  };

  const handleClick = () => {
    onRequestClose();
    openRegistration();
  }

  return (
    <div className='login_form'>
      <form onSubmit={handleSubmit}>
        <h2>Cześć!</h2>
        <h3>Wprowadź swoje dane do logowania.</h3>
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
        <p>
          Nie masz konta? <button className="login_form__register" onClick={handleClick}>Zarejestruj się</button>
        </p>
        <p className={cll}>
          {loginMessage}
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
