import React from 'react';
import Modal from 'react-modal';
import LoginForm from '../Login/Login.js';
import './LoginWindow.css';
import close from "../assets/close.png";


Modal.setAppElement('#root');

function LoginWindow({ isOpen, onRequestClose, openRegistration }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Login'
      className='login'
    >
      <LoginForm onRequestClose={onRequestClose} openRegistration={openRegistration}/>
      <img
        className="close_logo"
        onClick={onRequestClose}
        src={close}
        alt=""
      />
    </Modal>
  );
}

export default LoginWindow;