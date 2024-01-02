import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../App.js';
import avatarTemplate from "../../assets/avatar2.png";
import pencil from "../../assets/pencil.png";

import './MyAccount.css';

const MyAccount = ({ userData }) => {

  const { email, username, _id } = userData;

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [passwordChangeMessageState, setPasswordChangeMessageState] = useState('green');
  const [image, setImage] = useState(avatarTemplate);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    name: username,
    email: email,
  });

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImage(imageUrl);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    setEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const logout = () => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
  }

  const changePassword = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/changepassword', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, password, newPassword })
      });

      const json = await response.json();

      if (response.ok) {
        setPasswordChangeMessageState('green');
      }
      else {
        setPasswordChangeMessageState('red');
      }
      setPasswordChangeMessage(json.message);
    }
    catch (err) {
      console.error('Błąd po stronie serwera:', err);
    }
  }

  return (
    <div className='myaccount__container'>
      <div className="myaccount">
        <h2>Moje Konto</h2>
        <div className='myaccount__data'>
          <div className='myaccount__avatar'>
            <img
              src={image}
              alt=""
            />
            <label htmlFor="file-upload" className="myaccount__avatar__change">
              <img
                src={pencil}
                alt=""
              />
            </label>
            <input id="file-upload" type="file" onChange={handleImageChange} />
          </div>
          <div className='myaccount__info'>
            <div>
              <label>
                Nazwa użytkownika
              </label>
              {edit ? (
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  className="myaccount__input"
                />
              ) : (
                <div className='myaccount__inputvalue'>{data.name}</div>
              )}
            </div>
            <div>
              <label>
                Email
              </label>
              {edit ? (
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  className="myaccount__input"
                />
              ) : (
                <div className='myaccount__inputvalue'>{data.email}</div>
              )}
            </div>
            {edit ? (
              <button onClick={handleSave} className="dupa btn main small">ZAPISZ</button>
            ) : (
              <button onClick={handleEdit} className="dupa btn main small">EDYTUJ</button>
            )}
          </div>
        </div>
        <hr className='myaccount__data__border'></hr>
        <div className='myaccount__passwordchange'>
          <div className='myaccount__passwordchange__name'>Zmiana hasła</div>
          <div className='myaccount__passwordchange__inputs'>
            <input
              type="password"
              placeholder="Aktualne hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="myaccount__input"
            />
            <input
              type="password"
              placeholder="Nowe hasło"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="myaccount__input"
            />
          </div>
          <button className='btn main small' onClick={changePassword}>ZMIEŃ HASŁO</button>
          <p className={passwordChangeMessageState}>
            {passwordChangeMessage}
          </p>
        </div>
        <div className='myaccount__logout btn border' onClick={logout}>WYLOGUJ</div>
      </div>
    </div>
  );
};

export default MyAccount;
