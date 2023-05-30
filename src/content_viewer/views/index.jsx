import React, { useRef, useEffect, useState } from "react";
import { Segment, Layout } from "../components";
import { Controls } from "../components/controls";
import { Controls2 } from "../components/controls2";
import { ControlsProvider } from "../context/ControlsContext";
import { Navbar } from "../components/navbar";
import { Loader } from "../components";
import { ThemeProvider } from "styled-components";
import { selectTheme } from "../theme";
import { WisengineContent } from "../../WisengineProvider";
import "../scss/main.css";

const ContentViewer = ({ content = [], position, name = null }) => {
  const [parentWidth, setParentWidth] = useState(0);
  const parent = useRef(null);

  useEffect(() => {
    if (parent.current) {
      const parentWidth = parent.current.offsetWidth;
      setParentWidth(parentWidth - 10);
    }
  }, [content]);

  if (content.length === 0) return (
    <div ref={parent} style={{ width: "100%" }}>
      <Loader parentWidth={parentWidth} />
    </div>
  );
  
  const { config } = WisengineContent();

  return (
    <ThemeProvider theme={selectTheme(config.theme)}>
      <ControlsProvider>
        <Layout content={content} parentWidth={parentWidth}>
          <Navbar content={content} name={name} parentWidth={parentWidth} />
          {/* <IndexTable width={width} /> */}
          {/* <ConfigTable /> */}
          <Segment content={content} position={position} parentWidth={parentWidth} />
          
          {config.theme === "nbd" ? (
            <Controls content={content} position={position} parentWidth={parentWidth} />
          ) : config.theme === "harmony" ? (
            <Controls2 content={content} position={position} parentWidth={parentWidth} />
          ) : (
            <h1>Define theme</h1>
          )}
        </Layout>
      </ControlsProvider>
    </ThemeProvider>
  );
};

export default ContentViewer;
