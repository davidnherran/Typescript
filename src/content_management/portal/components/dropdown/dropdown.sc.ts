import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  width: 84%;
  margin-left: 16%;
  color: white;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const DropdownInput = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -1;
`;

export const DropdownLabel = styled.label`
  display: flex;
  justify-content: space-between;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
  height: 48px;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 16px;
  border-bottom: solid 1px #fff;
  
  &:hover {
    border-bottom: solid 1px #fff;
  }
  
  &::after {
    content: "\276F";
    width: 1em;
    height: 1em;
    text-align: center;
    transition: all 0.09s;
  }
  
  ${({ checked }) =>
    checked &&
    `
    border-bottom: solid 1px #ffffff; 
    &::after {
      transform: rotate(90deg);
    }
  `}
`;

export const DropdownTabsContents = styled.div`
  max-height: 0;
  transition: all 0.09s;
  
  ${({ checked }) =>
    checked &&
    `
    max-height: 100vh;
    padding-left: 1vw;
    padding-top: 10px;
  `}
`;

export const DropdownContent = styled.button`
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
  height: 38px;
  width: 100%;
  background-color: transparent;
  color: white;
  border: none;
  margin: 0 0 10px 0;
  text-align: left;
  padding-left: 10px;
  cursor: pointer;
  font-size: 15px;
  
  &:hover {
    background-color: #ffffff3e;
  }
`;