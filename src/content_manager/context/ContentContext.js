import React, { createContext, useContext, useState, useEffect } from "react";

const context = createContext();

export const useContent = () => {
  const ContentContext = useContext(context);
  if (!context) throw new Error("Context API requires a provider");
  return ContentContext;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [userContext, setUserContext] = useState("");
  const [segmentPosition, setSegmentPosition] = useState(0);

  const [graphContextContent, setGraphContextContent] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [videoDuration, setVideoDuration] = useState(0);

  const [segmentsOrdened, setSegmentsOrdened] = useState([]);
  const [segmentType, setSegmentType] = useState("");
  const [tools, setTools] = useState("");

  const [forceReload, setForceReload] = useState(false);

  const forceUpdate = () => {
    setSegmentsOrdened(segmentsOrdened);
  };

  useEffect(() => {
    forceUpdate();
    
    return () => {
      setForceReload(false);
    };
  }, [segmentsOrdened]);

  return (
    <context.Provider
      value={{
        content,
        setContent,
        userContext,
        setUserContext,
        segmentPosition,
        setSegmentPosition,
        graphContextContent,
        setGraphContextContent,
        uploadProgress,
        setUploadProgress,
        videoDuration,
        setVideoDuration,
        segmentType,
        setSegmentType,
        tools,
        setTools,
        segmentsOrdened,
        setSegmentsOrdened,
        forceReload,
        setForceReload,
        forceUpdate
      }}
    >
      {children}
    </context.Provider>
  );
};
