import React, { createContext, useContext, useState } from "react";

const context = createContext();

export const useControls = () => {
  const ControlsContext = useContext(context);
  if (!context) throw new Error("Context API requires a provider");
  return ControlsContext;
};

export const ControlsProvider = ({ children }) => {
  const [segmentPosition, setSegmentPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1024);
  const [showIndextable, setShowIndextable] = useState(false);
  const [colorSchemeUI, setColorSchemeUI] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState(null);
  const [configureControl, setConfigureControl] = useState(false);
  const [hoverVolume, setHoverVolume] = useState(false);

  const [moveCursor, setMoveCursor] = useState(false);
  const [videoTrack, setVideoTrack] = useState(0);

  const [onPause, setOnPause] = useState(false);
  const playVideo = (video) => {
    if (video.paused) {
      setOnPause(false);
      video.play();
    } else {
      video.pause();
      setOnPause(true);
    }
  };

  return (
    <context.Provider
      value={{
        segmentPosition,
        setSegmentPosition,
        containerWidth,
        setContainerWidth,
        showIndextable,
        setShowIndextable,
        colorSchemeUI,
        setColorSchemeUI,
        isFullscreen,
        setIsFullscreen,
        setVideoPlayer,
        videoPlayer,
        configureControl,
        setConfigureControl,
        moveCursor, 
        setMoveCursor,
        videoTrack, 
        setVideoTrack,
        hoverVolume, 
        setHoverVolume,
        playVideo,
        onPause, 
        setOnPause
      }}
    >
      {children}
    </context.Provider>
  );
};
