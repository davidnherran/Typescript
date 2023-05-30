import styled from "styled-components";
import InputRange from "react-input-range";
import "./lib/input_range.css";

export const CustomRange = styled(InputRange)``;

export const RangeContainer = styled.div`
  width: 90%;
  margin-left: 5%;
  transform: translateY(9px);
  background-color: #676fa0;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: ${props => props.theme.fontFamily};
`;
