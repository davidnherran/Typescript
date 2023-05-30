import React, { FC } from "react";
import { ModalProps } from "./modal.types";
import {
  Backdrop,
  ModalContainer,
  ModalContent,
  ModalButtons,
} from "./modal.styles";

const Modal: FC<ModalProps> = ({
  title,
  children,
  isOpen = false,
  ƒcloseModal,
}) : JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <Backdrop>
      <ModalContainer>
        <h2>{title}</h2>
        <ModalButtons onClick={ƒcloseModal}>X</ModalButtons>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
