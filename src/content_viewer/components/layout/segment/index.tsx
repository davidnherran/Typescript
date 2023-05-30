import React, { useEffect } from "react";
import Fallback from "../../Segments/SegmentFallback";
import SegmentVideo from "../../Segments/SegmentVideo";
import SegmentImage from "../../Segments/SegmentImage";
import SegmentRCM from "../../Segments/SegmentRCM";
import SegmentAudio from "../../Segments/SegmentAudio";
import SegmentSurvey from "../../Segments/SegmentSurvey";
import { useControls } from "../../../context/ControlsContext";
import { SegmentProps } from "./segment.types";
import { WisengineContent } from "../../../../WisengineProvider";

const Segment = ({ content, position, parentWidth }: SegmentProps) => {
  const { segmentPosition, setSegmentPosition } = useControls();

  const SEGMENT_TYPE = content[0].SEGMENTS[segmentPosition]?.SEGMENT_TYPE;
  const CONTENT_TYPE = {
    VIDEO: <SegmentVideo src={content[0]} />,
    IMAGEN: <SegmentImage src={content[0]} />,
    RCM: <SegmentRCM src={content[0]} parentWidth={parentWidth} />,
    AUDIO: <SegmentAudio src={content[0]} />,
    SURVEY: <SegmentSurvey src={content[0]} />,
  };
  const DEFAULT_CONTENT = <Fallback />;
  const render = CONTENT_TYPE[SEGMENT_TYPE] || DEFAULT_CONTENT;

  useEffect(() => {
    if (
      position > -1 &&
      position < content[0].SEGMENTS.length &&
      typeof position === "number"
    ) {
      console.log("desde el paquete", position)
      setSegmentPosition(position);
    }
    return () => {};
  }, [position]);

  return (
    <div
      style={{
        border: "solid 1px transparent",
        transform: "translateY(-10.5%)",
        height: "100%",
      }}
    >
      {render}
    </div>
  );
};

export default Segment;
