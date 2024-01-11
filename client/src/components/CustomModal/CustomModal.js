import React from 'react';
import Modal from 'react-modal';
import close from "../../assets/close.png";

Modal.setAppElement('#root');

function CustomModal({ isOpen, onRequestClose, contentLabel, className, children }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            className={className}
        >
            {children}
            <img
                className="close_logo"
                onClick={onRequestClose}
                src={close}
                alt=""
            />
        </Modal>
    );
}

export default CustomModal