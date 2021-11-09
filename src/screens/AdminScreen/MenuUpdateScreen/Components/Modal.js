import React from "react";
const Modal = ({ confirmDeleteImageYes, confirmDeleteImageNo, message }) => {
  return (
    <div className="modal-confirm-backdrop">
      <div className="modal-confirm-window">
        <div className="confirm-main">
          <span>{message}</span>
          <div className="confirm-main__buttons">
            <span onClick={() => confirmDeleteImageYes()}>예</span>
            <span onClick={() => confirmDeleteImageNo()}>아니요</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
