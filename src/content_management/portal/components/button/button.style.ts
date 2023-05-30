import styled from "styled-components";

export const SButton = styled.button<TTheme>`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");
  z-index: 10;
  padding: 10px 26px;
  height: 38px;
  border: none;
  border-radius: 19px;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  color: ${({ theme }) => theme.button.color};
  background-color: ${({ customColor, theme } : TTheme) => customColor || theme.button.background};
  transform: translate(-40px, -50px);
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const FButton = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");
  z-index: 10;
  padding: 10px 26px;
  height: 38px;
  border: none;
  border-radius: 19px;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  color: ${({ theme }) => theme.button.color};
  background-color: ${({ theme }) => theme.button.background};
`;
