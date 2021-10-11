import React from 'react';
import './Modal.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}></div>
    </div>
  );
};

export default Modal;
