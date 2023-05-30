import React, { FC } from "react";
// import { ButtonProps } from "./button";
import { ButtonSquare, ButtonIcon } from "./button.styles";

const Button: FC<ButtonProps> = ({ icon, title, onClick }): JSX.Element | null => {
  return (
    <ButtonSquare onClick={onClick}>
      <ButtonIcon>
        <img src={icon} width="20" />
        <p>{title}</p>
      </ButtonIcon>
    </ButtonSquare>
  );
};

export default Button;
