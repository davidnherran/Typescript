import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
  font-family: "Opensans light";
  overflow-y: scroll;
  height: calc(100vh - 200px);
  width: ${({ theme }) => `calc(100vw - ${theme.sidebar.width})`};
  height: 100vh;
  max-height: 100vh;
  background-color: ${({ theme }) => theme.wrapper.background};
  position: fixed;
  transform: translateX(${({ theme }) => theme.sidebar.width});
  padding: 36px 0 36px 36px;
  border: none;
`
export default Wrapper;


