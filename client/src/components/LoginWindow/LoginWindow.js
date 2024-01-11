import React from 'react';
import LoginForm from '../Login/Login.js';
import './LoginWindow.css';
import CustomModal from '../CustomModal/CustomModal.js';

function LoginWindow({ isOpen, onRequestClose, openRegistration }) {
  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Login'
      className='login'
    >
      <LoginForm onRequestClose={onRequestClose} openRegistration={openRegistration} />
    </CustomModal>
    // <Modal
    //   isOpen={isOpen}
    //   onRequestClose={onRequestClose}
    //   contentLabel='Login'
    //   className='login'
    // >
    //   <LoginForm onRequestClose={onRequestClose} openRegistration={openRegistration}/>
    //   <img
    //     className="close_logo"
    //     onClick={onRequestClose}
    //     src={close}
    //     alt=""
    //   />
    // </Modal>
  );
}

export default LoginWindow;