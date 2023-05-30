import styled from "styled-components";
import { labelbg } from "../../assets/icons";
import { TimelineProps } from "./timeline.types";

export const TimelineWrapper = styled.div`
  background-color: #4c4c4c;
  height: 145px;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 2;
`;

export const TimelineTab = styled.div`
  background-image: url(${labelbg});
  background-repeat: no-repeat;
  transform: translateY(-24px);
  width: 168px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 6px 10px;
  h3 {
    margin: 0px;
    height: 24px;
    font-size: 12px;
    font-weight: 200;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
`;

export const ListOfSegments = styled.div`
  background-color: #222326;
  transform: translate(10px, -20px);
  width: calc(100% - 20px);
  height: calc(100% - 40px);
  position: absolute;
  z-index: 3;
  border-radius: 4px;
  display: flex;
  overflow-x: scroll;
  padding-left: 10px;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    height: 16px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #4c4c4c;
    border-radius: 0px;
    border-top: none;
    border-left: solid 16px #222326;
    border-right: solid 16px #222326;
    border-bottom: solid 6px #222326;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const DroppableProvided = styled.div`
  color: #ffffff;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const DraggableItem = styled.div`
  color: #ffffff;
  flex-direction: row;
  display: inline-flex;
  flex-direction: row;
  img {
    width: 100px;
    min-width: 100px;
    height: 66px;
    background-color: #545454;
    margin: 15px 8px;
    border-radius: 4px;
    cursor: pointer;
    border: ${(props: TimelineProps) =>
      props.active ? "2px solid #FFC107" : "none"};
  }
`;

export const DraggableNewItem = styled.div`
  background-color: ${({theme}) => theme.timeline.plusButton};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  min-width: 100px;
  height: 66px;
  margin: 15px 8px;
  border-radius: 4px;
  cursor: pointer;
  border: solid 1px #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  img {
    width: 30px;
    height: 30px;
  }
`;

export const TimelineActions = styled.div`
  width: 100%;
  height: 25px;
  z-index: 999;
  position: absolute;
  padding-left: 10px;
  padding-top: 4px;
  img {
    margin-right: 8px;
    margin-left: 8px;
    cursor: pointer;
  }
`;
