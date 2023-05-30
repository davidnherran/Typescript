import styled from "styled-components";

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

export const ModalContainer = styled.div`
  width: 40vw;
  background-color: #4c4c4c;
  color: white;
  padding: 30px;
  border-radius: 6px;
  box-sizing: border-box;
  h2 {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 100;
    margin: 0;
    padding: 0;
    font-size: 26px;
  }
`;

export const ModalContent = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 100;
  font-size: 16px;
  color: #4a4a4a;
  line-height: 1.5;
  p {
    margin: 0;
    padding: 0;
  }
`;

export const ModalButtons = styled.div`
  float: right;
  transform: translateY(-34px);
  cursor: pointer;
`;
