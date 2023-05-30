import React from "react";
import { useControls } from "../../../context/ControlsContext";
import "./timeline.css";

const TimeLine = ({ controllers, content }) => {
  const {
    containerWidth,
    setContainerWidth,
    segmentPosition,
  } = useControls();

  const aspectRatio = 9 / 16;
  const controlHeight = 56;

  return (
    <div
      className="contentviewer__timeline"
      style={{
        width: `${containerWidth}px`,
        marginTop: `${containerWidth * aspectRatio - controlHeight}px`,
      }}
    >
      <input
        type="range"
        className="contentviewer__timeline-lapse"
        style={{ width: `${containerWidth}px` }}
        min={
          content !== undefined
            ? content.SEGMENTS[segmentPosition].START
            : 0
        }
        max={
          content !== undefined
            ? content.SEGMENTS[segmentPosition].END
            : 10
        }
        step="0.01"
        onChange={(e) => {
          controllers.setProgress(e.target.value);
        }}
        value={controllers.progress}
        //  onChange={(e) => {
        //    setProgress(Number(e.target.value));
        //    videoRef.current.currentTime = Number(e.target.value);
        //  }}
      />
    </div>
  );
};

export default TimeLine;
