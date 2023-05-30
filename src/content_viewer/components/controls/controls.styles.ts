import styled from "styled-components";

type TControlsStyles = {
  position?: "end" | "start";
}

export const ControlsContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");
  background: ${({ theme }) => theme.controls.background};
  height: ${(props) => props.parentWidth * 0.07}px;
  transform: translateY(calc(-94% * 2));
  z-index: 5;
  width: 100%;
  bottom: 0;
  left: 0;
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
  height: ${(props) => props.parentWidth * 0.06}px;
  padding-top: 5px;
`;

export const Action = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: ${({ position } : TControlsStyles) => (position === "end" ? "flex-end" : "flex-start")};
`;
