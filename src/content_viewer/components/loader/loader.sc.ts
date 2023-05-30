import styled, { keyframes } from "styled-components";

const loaderAnimation = keyframes`
  0% { transform: rotate(-45deg); }
  50% { transform: rotate(-135deg); }
  100% { transform: rotate(-225deg); }
`;

const span1Animation = keyframes`
  0% { transform: translate(0); }
  50% { transform: translate(-50px, 0); border-color: #EE4D68; }
  100% { transform: translate(0); }
`;

const span2Animation = keyframes`
  0% { transform: translate(0); }
  50% { transform: translate(50px, 0); border-color: #875678; }
  100% { transform: translate(0); }
`;

const span3Animation = keyframes`
  0% { transform: translate(0); }
  50% { transform: translate(0, -50px); border-color: #FF9900; }
  100% { transform: translate(0); }
`;

const span4Animation = keyframes`
  0% { transform: translate(0); }
  50% { transform: translate(0, 50px); border-color: #00E4F6; }
  100% { transform: translate(0); }
`;

export const LoaderContainer = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  animation: ${loaderAnimation} 2s infinite ease-in-out;
`;

export const LoaderSpan = styled.span`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  border: 4px solid #0B1B48;

  &:nth-child(1) {
    animation: ${span1Animation} 2s ease-in-out infinite;
  }

  &:nth-child(2) {
    animation: ${span2Animation} 2s ease-in-out infinite;
  }

  &:nth-child(3) {
    animation: ${span3Animation} 2s ease-in-out infinite;
  }

  &:nth-child(4) {
    animation: ${span4Animation} 2s ease-in-out infinite;
  }
`;

export const LoaderSpace = styled.div`
  width: ${(props) => props.parentWidth}px;
  height: ${(props) => props.parentHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  `