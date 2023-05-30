import React, { useEffect, useState } from "react";
import { useContent } from "../../context/ContentContext";
import { useQuery } from "@apollo/client";
import { GET_CONTENT_BY_ID } from "../../graphql/queries";
import { getParamId } from "../../config";
import SegmentForm from "../forms/Segments";
import {
  PreviewImage,
  PreviewVideo,
  PreviewRCM,
  PreviewSurvey,
  PreviewAudio,
  PreviewTags,
  PreviewDefault,
} from "../previews";

const Segments = () => {
  const [segmentId, setSegmentId] = useState(0);
  const { segmentPosition, segmentsOrdened, setSegmentsOrdened } = useContent();
  const paramId = getParamId();

  const { data: datos } = useQuery(GET_CONTENT_BY_ID, {
    variables: { ID: paramId },
  });

  useEffect(() => {
    if (datos?.getContent) {
      setSegmentId(datos?.getContent.SEGMENTS[segmentPosition]?.ID ?? 0);
    }
  }, [datos, segmentPosition]);

  useEffect(() => {
    if (datos) {
      const isDataEmpty = datos.getContent?.SEGMENTS?.length === 0;
      if (isDataEmpty) {
        setSegmentsOrdened([
          {
            NAME: "",
            SEGMENT_TYPE: "",
            START: 0,
            END: 0,
            ORDER: Number(segmentPosition),
            FILE: "file",
            TAG: "",
            THUMBNAIL: "",
            SEGMENT_PARENT: Number(paramId),
          },
        ]);
      } else {
        setSegmentsOrdened(datos.getContent.SEGMENTS);
      }
    }
  }, [datos]);

  if (!segmentsOrdened[0]) return <span></span>;


  const PREVIEWS = {
    IMAGEN: <PreviewImage />,
    VIDEO: <PreviewVideo />,
    RCM: <PreviewRCM />,
    SURVEY: <PreviewSurvey />,
    AUDIO: <PreviewAudio />,
    TAGS: <PreviewTags />,
  };

  const DEFAULT_PREVIEW = <PreviewDefault />;

  const preview =
    PREVIEWS[segmentsOrdened[segmentPosition]?.SEGMENT_TYPE] || DEFAULT_PREVIEW;

  return (
    <div
      style={{
        overflowY: "scroll",
        height: "65vh",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {preview}
      </div>
      <SegmentForm />
    </div>
  );
};

export default Segments;
