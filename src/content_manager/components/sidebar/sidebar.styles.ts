import styled from "styled-components";
import { tab } from "../../assets/icons";

export const Side = styled.div`
  width: 18.5vw;
  height: calc(100vh - 48px);
  background-color: #333333;
  position: absolute;
  padding: 0 0.5vw;
  box-sizing: border-box;
  h2 {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 100;
    font-size: 14px;
    color: #ffffff;
    margin: 0;
  }
  img {
    z-index: 2;
  }
`;

export const Controls = styled.div`
  width: 17.5vw;
  height: 44vh;
  background-color: #222326;
  border-radius: 2px;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export const EmptyAlert = styled.p`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 100;
  font-size: 16px;
  color: #717171;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3vw;
  text-align: center;
`;

export const SideTab = styled.div`
  height: 24px;
  background-repeat: no-repeat;
  transform: translateY(-24px);
  color: white;
  padding: 4px;
  font-size: 14px;
  background-image: url(${tab});
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export const SideSearch = styled.div`
  input {
    background-color: #222326;
    border: none;
    color: white;
    transform: translateY(-16px);
    border-radius: 2px;
    width: 175px;
    padding-left: 4px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
  }
  img {
    transform: translateY(-16px);
    margin: 0px 5px;
    cursor: pointer;
  }
`;
