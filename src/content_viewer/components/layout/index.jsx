import React, { useState, useEffect } from "react";
import { LayoutContainer } from "./layout.styles";
import { WisengineContent } from "../../../WisengineProvider"
import { useContent } from "../../context/ContentContext";

const Layout = ({ children, content, parentWidth }) => {
  const [parentHeight, setParentHeight] = useState(0);

  const calcularAltura = (ancho) => {
    const aspectRatio = 9 / 16;
    const height = ancho * aspectRatio;
    setParentHeight(Math.floor(height));
  };

  useEffect(() => {
    calcularAltura(parentWidth);
  }, [parentWidth]);

  return <LayoutContainer parentWidth={parentWidth} parentHeight={parentHeight}>{content && children}</LayoutContainer>;
};

export default Layout;
