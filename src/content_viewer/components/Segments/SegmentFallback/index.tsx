import React from "react";
import { FallbackContainer } from "./fallback.styles";

const Fallback = (): JSX.Element => {
  return (
    <FallbackContainer>
      <h1>No hay segmentos creados</h1>
    </FallbackContainer>
  );
};

export default Fallback;