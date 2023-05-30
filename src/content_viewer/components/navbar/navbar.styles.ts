import styled from "styled-components";

export const NavbarStyled = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");
  margin: 0px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  height: 10.5%;
  max-height: 70px;
  color: #ffffff;
  padding: 0 22px;
  box-sizing: border-box;
  z-index: 9;
  letter-spacing: 1px;
  background: ${({ theme }) => theme.navbar.background};
  h1 {
    font-size: ${(props) => props.fontSize}px;
    font-family: "Open Sans", sans-serif;
    font-weight: light;
    padding: 0;
    margin: 0;
    cursor: default;
  }
`;
