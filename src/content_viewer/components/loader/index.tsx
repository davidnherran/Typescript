import React, { useEffect, useState } from "react";
import { LoaderContainer, LoaderSpan, LoaderSpace } from "./loader.sc";

const Loader = ({parentWidth}) => {
  const [parentHeight, setParentHeight] = useState(0);

  const calcularAltura = (ancho) => {
    const aspectRatio = 9 / 16;
    const height = ancho * aspectRatio;
    setParentHeight(Math.floor(height));
  };

  useEffect(() => {
    calcularAltura(parentWidth);
  }, [parentWidth]);

  return (
    <LoaderSpace parentWidth={parentWidth} parentHeight={parentHeight}>
      <LoaderContainer>
        <LoaderSpan></LoaderSpan>
        <LoaderSpan></LoaderSpan>
        <LoaderSpan></LoaderSpan>
        <LoaderSpan></LoaderSpan>
      </LoaderContainer>
    </LoaderSpace>
  );
};

export default Loader;
