import styled from "styled-components";

export const FormNewSegment = styled.form`
  display: flex;
`;

export const InputNewSegment = styled.input`
  width: 50%;
  border: solid 1px white;
  background-color: transparent;
  height: 32px;
  color: white;
  padding-left: 8px;
`;

export const SelectNewSegment = styled.select`
  width: 30%;
  border: solid 1px white;
  background-color: transparent;
  height: 32px;
  color: white;
  padding-left: 8px;
  margin-left: 1%;
`;

export const ButtonNewSegment = styled.button`
  width: 17%;
  margin-left: 1%;
  height: 32px;
  border-radius: 16px;
  background-color: ${({theme}) => theme.modal.confirm};
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
`;
