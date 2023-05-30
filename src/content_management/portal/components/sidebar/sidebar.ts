import styled from "styled-components";

const Sidebar = styled.div<TTheme>`
  width: ${({ theme }) => theme.sidebar.width};
  height: 100vh;
  background-color: ${({ customColor, theme } : TTheme) => customColor || theme.sidebar.background};
  position: fixed;
  padding-top: 110px;
  box-sizing: border-box;
  padding-left: ${({ theme }) => theme.sidebar.paddingLeft};
`;

export default Sidebar;