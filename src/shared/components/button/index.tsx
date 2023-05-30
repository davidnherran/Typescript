import React from "react";
import { ButtonTypes } from "./types";
import './button.css';

const Button = ({
  children,
  type = "button",
  onClick = () => {},
  className = "",
  variant = "primary",
  disabled = false,
}: ButtonTypes): JSX.Element => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={`cp btn btn-${variant} ${className}`}
  >
    {children ?? "Click!"}
  </button>
);

export default Button;
