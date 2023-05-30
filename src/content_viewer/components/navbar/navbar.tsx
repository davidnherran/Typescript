import React, { useEffect, useState } from "react";
import { NavbarStyled } from "./navbar.styles";
import { IContentProps } from "./navbar.types";

const Navbar = ({content, name, parentWidth}: IContentProps): JSX.Element => {

  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const handleResize = () => {
      const ancho = parentWidth;
      const baseAncho = 1080;
      const baseFontSize = 22;
      const nuevaFontSize = (ancho * baseFontSize) / baseAncho;
      setFontSize(nuevaFontSize);
    };

    handleResize();
  }, [parentWidth]);

  return (
    <NavbarStyled fontSize={fontSize}>
      <h1>{name ?? content[0]?.NAME}</h1>
    </NavbarStyled>
  );
};

export default Navbar;
