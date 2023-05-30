import React from "react";
//import Wiselink from "../../components/Wiselink/Wiselink.js";
//import CelEdit from "../../components/RcmInputTest/RcmInputTest.js";
//import FeedbackViewer from '../../components/FeedbackViewer/FeedbackViewer';
import JsxParser from "react-jsx-parser";
import "./index.css";

function RcmViewer({ content, processContentCallback, height }) {
  // let t = useTranslate("RcmViewer");

  const bindings = {
    processContentCallback,
  };

  return (
    <React.Fragment>
      <JsxParser
        style={{ height: height }}
        autoCloseVoidElements
        bindings={bindings}
        //components={{ Wiselink, CelEdit, FeedbackViewer }}
        jsx={content}
      />
    </React.Fragment>
  );
}

export default RcmViewer;
