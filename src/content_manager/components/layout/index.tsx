import React from "react";
import { ContentProvider } from "../../context/ContentContext";
import { LayoutProps } from "./types";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div style={{overflow: 'hidden', overflowY: 'hidden'}}>
      <ContentProvider>{children}</ContentProvider>
    </div>
  );
};

export default Layout;
