import styled from "styled-components";

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100vw;
  height: 48px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: #222326;
  color: #ffffff;
  h1 {
    width: 100%;
    font-size: 18px;
    text-align: center;
    font-weight: 100;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    cursor: default;
  }
  span {
    width: 100%;
    text-align: right;
    font-weight: 100;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  img {
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const UploadButton = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer !important;
  content: "Subir Archivo";
  color: white;
  &::before {
    text-align: right;
    background-color: transparent;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    content: "Subir Archivo";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer !important;
  }
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  input[type="file"] {
    opacity: 0;
    width: 100%;
    height: 32px;
    display: inline-block;
    cursor: pointer;
  }
`;
