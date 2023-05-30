import React, { FC, Fragment, Key } from "react";
import { useContent } from "../../../context/ContentContext";
import { ImagePreview } from "./image.styles";
import { ISegments } from "../previews.types";

const PreviewImage: FC = () => {
  const { segmentsOrdened, segmentPosition } = useContent();

  return (
    <Fragment>
      {segmentsOrdened.map((segment: ISegments, index: Key) => {
        if (index === segmentPosition) {
          return (
            <ImagePreview src={segment.FILE} alt="Vista previa" key={index} />
          );
        }
      })}
    </Fragment>
  );
};

export default PreviewImage;
