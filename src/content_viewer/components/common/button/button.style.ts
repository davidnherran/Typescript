import styled from "styled-components";

export const Volume = styled.input`
  -webkit-appearance: none;
  width: 70px;
  transform: translateY(-3px);

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: #f4f4f4;
  }
  &::-webkit-slider-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -webkit-appearance: none;
    cursor: ew-resize;
    background: #ffffff;
    transform: translateY(-3px);
  }
  &::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: #f1f1f1;
  }
  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -webkit-appearance: none;
    cursor: ew-resize;
    background: #ffffff;
    transform: translateY(-3px);
  }


`;