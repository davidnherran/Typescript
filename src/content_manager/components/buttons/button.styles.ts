import styled from "styled-components";

export const ButtonSquare = styled.button`
  width: 4.7vw;
  min-width: 4.7vw;
  max-width: 4.7vw;
  height: 4.7vw;
  background-color: #333333;
  border-radius: 16px;
  border: none;
  margin: 0.49vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-top: 12px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  p {
    font-size: 0.8vw;
    position: relative;
  }
  &:active {
    box-shadow: -2px -2px 0px rgb(0 0 0 / 30%), 0px 0px 0 -2px rgb(0 0 0 / 15%);
    transform: translateY(1px);
    transform: scale(0.98);
  }
`;

export const ButtonIcon = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
