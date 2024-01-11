import React from 'react';
import RegistrationForm from '../Registration/Registration';
import './RegistrationWindow.css';
import CustomModal from '../CustomModal/CustomModal.js';

function RegistrationWindow({ isOpen, onRequestClose, openLogin }) {
  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Rejestracja'
      className='registration'
    >
      <RegistrationForm openLogin={openLogin} onRequestClose={onRequestClose} />
    </CustomModal>
  );
}

export default RegistrationWindow;