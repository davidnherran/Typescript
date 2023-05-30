import styled from "styled-components";

type TControlsStyles = {
  position?: "flex-end" | "flex-start" | "center";
}

export const ControlsContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");
  background: ${({ theme }) => theme.controls.background};
  height: ${(props) => props.parentWidth * 0.07}px;
  transform: translateY(calc(-94% * 2));
  border-radius: ${({ theme }) => theme.controls.borderRadius};
  z-index: 5;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  span {
    margin: 0;
    color: white;
    font-size: 18px;
    padding-left: 18px;
    padding-top: 0px;
    font-family: "Open Sans", sans-serif;
    text-transform: capitalize;
    height: ${(props) => props.parentWidth * 0.01}px;
  }
`;

export const Actions = styled.div`
  display: flex;
  width: 100%;
`;

export const Action = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: ${({ position } : TControlsStyles) => (position)};
`;
