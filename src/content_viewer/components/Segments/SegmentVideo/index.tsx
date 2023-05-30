import React, { useEffect, useState, useRef } from "react";
import { useControls } from "../../../context/ControlsContext";

const SegmentVideo = ({ src }) => {
  const [source, setSource] = useState(src);
  const segmentVideoRef = useRef(null);
  const { setVideoPlayer, segmentPosition, setSegmentPosition, setVideoTrack } =
    useControls();
  const maxSegments = src.SEGMENTS.length - 1;

  useEffect(() => {
    setSource(
      src.SEGMENTS[segmentPosition].FILE +
        "#t=" +
        src.SEGMENTS[segmentPosition].START
    );
    return () => {
      setSource("");
    };
  }, [src]);

  const setPlayer = () => {
    const player = segmentVideoRef.current;
    setVideoPlayer(player);
    player.play();
  };

  const handleNextSegment = (e) => {
    setVideoTrack(Math.floor(e));
    if (e >= src.SEGMENTS[segmentPosition].END) {
      segmentPosition < maxSegments && setSegmentPosition(segmentPosition + 1);
    }
  };

  return (
    <>
      {src.SEGMENTS.map(
        (x, index) =>
          index === segmentPosition && (
            <video
              id="player"
              src={x.FILE + "#t=" + x.START}
              ref={segmentVideoRef}
              onCanPlay={setPlayer}
              width="100%"
              height="100%"
              onTimeUpdate={(e) => {
                handleNextSegment(e.currentTarget.currentTime);
              }}
            />
          )
      )}
    </>
  );
};

export default SegmentVideo;
