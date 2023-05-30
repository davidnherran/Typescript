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

export const ModalC = styled.div`
  width: 40vw;
  background-color: white;
  padding: 30px;
  border-radius: 6px;
  box-sizing: border-box;
  h2 {
    font-family: "Open Sans", sans-serif;
    margin: 0;
    padding: 0;
    font-size: 26px;
  }
`;

export const ModalBody = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  color: #4a4a4a;
  line-height: 1.5;
  p {
    margin: 0;
    padding: 0;
  }
`;
