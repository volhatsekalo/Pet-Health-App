import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import avatar2 from "../../assets/avatar2.png";
import pencil from "../../assets/pencil.png";

import './MyAccount.css';

const MyAccount = () => {
  //    WYLOGUJ POWINNO PRZENOSIC NA STRONE GLOWNĄ I ZMIENIAĆ ZMIENNĄ ISLOGGEDIN
  const [image, setImage] = useState(avatar2);
  const [data, setData] = useState({
    name: 'Olga Tiekało',
    email: 'olgatiekalo@gmail.com',
  });
  const [edit, setEdit] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImage(imageUrl);
  };

  let navigate = useNavigate();

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
              name="password"
              placeholder="Aktualne hasło"
              // onChange={handleInputChange}
              className="myaccount__input"
            />
            <input
              type="password"
              name="password"
              placeholder="Nowe hasło"
              // onChange={handleInputChange}
              className="myaccount__input"
            />
          </div>
          <button className='btn main small'>ZMIEŃ HASŁO</button>
        </div>
        <div className='myaccount__logout btn border' onClick={() => navigate("/")}>WYLOGUJ</div>
        {/* <div className='myaccount__delete' onClick={() => navigate("/")}>Usuń konto</div> */}
      </div>
    </div>
  );
};

export default MyAccount;
