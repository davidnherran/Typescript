import styled from "styled-components";
import { ColProps } from "./grid.types";

export const Container = styled.div`
  width: 96%;
  margin-left: auto;
  margin-right: auto;
`;

export const Row = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Col = styled.div`
  width: ${(props: ColProps) => props.size * 8.3}%;
  text-align: ${(props) => props.align};
  justify-content: ${(props) => props.justify || "flex-start"};

  align-items: ${(props) => props.align || "center"};
  display: flex;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
