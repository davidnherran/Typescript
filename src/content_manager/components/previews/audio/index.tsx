import React, { FC } from "react";
import { useContent } from "../../../context/ContentContext";

const PreviewAudio: FC = () => {
  const { segmentsOrdened, segmentPosition } = useContent();

  return (
    <div>
      <audio controls src="https://content-management-mf.s3.us-east-1.amazonaws.com/file-1680104775626.mp3"  />
      {segmentsOrdened.map((segment, index) => {
        if (index === segmentPosition) {
          return (
            <audio src={segment.FILE} key={index} />
          );
        }
      })}
    </div>
  );
};

export default PreviewAudio;
