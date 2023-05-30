import React, { FC, Fragment, Key } from "react";
import { useContent } from "../../../context/ContentContext";
import { ISegments } from "../previews.types";

const PreviewVideo: FC = () => {
  const { segmentsOrdened, segmentPosition, setVideoDuration } = useContent();

  return (
    <Fragment>
      {segmentsOrdened.map((segment : ISegments, index : Key) => {
        if (index === segmentPosition) {
          return (
            <Fragment key={index}>
            <video
              controls
              style={{ width: "auto", height: "64vh" }}
              onLoadedMetadata={(e) => {
                setVideoDuration(e.target.duration);
              }}
              src={`${segment.FILE}#t=${segment.START}` ?? ""}
            >
            </video>
            
            
            </Fragment>
          );
        }
      })}
    </Fragment>
  );
};

export default PreviewVideo;
