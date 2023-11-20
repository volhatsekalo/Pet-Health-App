import React from 'react';
import { useState } from 'react';
import avatar from "../assets/avatar.png";

import './MyAccount.css';

const MyAccount = () => {
  const [image, setImage] = useState(avatar);
  const [data, setData] = useState({
    name: 'Jan Kowalski',
    email: 'jan@example.com',
  });
  const [edit, setEdit] = useState(false);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
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

  return (
    <div className='myaccount__container'>
      <div className="myaccount">
        <h2>Moje Konto</h2>
        <div className='fl'>
          <div className='myaccount__avatar'>
            <img
              src={image}
              alt=""
            />
            <label htmlFor="file-upload" className="btn">
              Wybierz zdjęcie
            </label>
            <input id="file-upload" type="file" onChange={handleImageChange} />
          </div>
          <div className='myaccount__info'>
            <div>
              <label>
                Imię
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
              <button onClick={handleSave} className="btn main">Zapisz</button>
            ) : (
              <button onClick={handleEdit} className="btn main">Edytuj</button>
            )}
            {/* <button onClick={handleLogout} className="btn main">Wyloguj</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
