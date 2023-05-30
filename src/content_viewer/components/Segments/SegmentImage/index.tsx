import React from "react";
import { useControls } from "../../../context/ControlsContext";

const SegmentImage = (src): JSX.Element => {
  const { segmentPosition } = useControls();

  const { SEGMENTS } = src.src;

  return (
    <img
      id="image"
      //onLoad={handleAutoNext}
      style={{ width: "100%", height: "100%", objectFit: "cover"}}
      width="100%"
      height="100%"
      src={SEGMENTS[segmentPosition].FILE}
      alt="SEGMENT_IMAGE"
    />
  );
};

export default SegmentImage;
