import styled from "styled-components";

type LayoutContainerProps = {
  width: string;
};

export const LayoutContainer = styled.div`
  aspect-ratio: 16 / 9;
  box-sizing: border-box;
  font-family: "Circular light";
  font-weight: bold;
  width: ${(props) => props.parentWidth}px;
  height: ${(props) => props.parentHeight}px;
  top: 0;
  left: 0;
`;
