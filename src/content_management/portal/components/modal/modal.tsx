import React from "react";
import { Backdrop, ModalC, ModalBody } from "./modal.sc";

const Modal = ({ isOpen = false, title, children } : IModal): TElement => {
  if (!isOpen) return null;

  return (
    <Backdrop>
      <ModalC>
        <h2>{title}</h2>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalC>
    </Backdrop>
  );
};

export default Modal;
