import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinerLoader = styled.div`
  border: 3px solid #ffffff;
  border-radius: 50%;
  border-top: 3px solid #9BA8EA;
  width: 24px;
  height: 24px;
  -webkit-animation: ${spin} 2s linear infinite;
  animation: ${spin} 2s linear infinite;
`;