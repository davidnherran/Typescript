import React, { Fragment } from "react";
import { useControls } from "../../../context/ControlsContext";

const SegmentAudio = (src) => {
  const { segmentPosition } = useControls();

  return (
    <Fragment>
      <img
        id="image"
        width="100%"
        height="100%"
        src={src.SEGMENTS[segmentPosition]?.FILE}
      />
      <audio
        id="audio"
        autoPlay
        src={src.SEGMENTS[segmentPosition]?.FILE}
      />
    </Fragment>
  );
};

export default SegmentAudio;
