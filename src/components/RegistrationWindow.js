import React from 'react';
import Modal from 'react-modal';
import RegistrationForm from './Registration';
import './RegistrationWindow.css';
import close from "../assets/close.png";


Modal.setAppElement('#root');

function RegistrationWindow({ isOpen, onRequestClose, openLogin}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Rejestracja'
      className='registration'
    >
      <RegistrationForm openLogin={openLogin} onRequestClose={onRequestClose}/>
      <img
        className="close_logo"
        onClick={onRequestClose}
        src={close}
        alt=""
      />
    </Modal>
  );
}

export default RegistrationWindow;