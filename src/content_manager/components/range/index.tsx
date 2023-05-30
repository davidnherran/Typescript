import React, { FC, Fragment, useState, useEffect } from "react";
import { CustomRange, RangeContainer } from "./range.styles";
import { useContent } from "../../context/ContentContext";
import { useMutation } from "@apollo/client";
import { UPDATE_SEGMENT } from "../../graphql/mutations";
import { Row, Col } from "../grid";
import { Toast } from "../../services/moduleServices";
import { ƒparseTime } from "../../services/pureFunctions";
import { IRange } from "./range.types";

const Range: FC = () => {
  const {
    segmentsOrdened,
    segmentPosition,
    videoDuration,
    tools,
    setSegmentsOrdened,
  } = useContent();
  const [updateSegment] = useMutation(UPDATE_SEGMENT);
  const [value, setValue] = useState({ min: 0, max: 0 });

  useEffect(() => {
    if (segmentsOrdened[segmentPosition]?.SEGMENT_TYPE === "VIDEO") {
      setValue({
        min: segmentsOrdened[segmentPosition]?.START,
        max: segmentsOrdened[segmentPosition]?.END,
      });
    }
    return () => {
      setValue({ min: 0, max: 0 });
    };
  }, [segmentsOrdened, segmentPosition]);

  const handleUpdate = async (value: IRange) => {
    const segmentId = segmentsOrdened[segmentPosition].ID;
    try {
      segmentsOrdened[segmentPosition] = {
        ...segmentsOrdened[segmentPosition],
        END: value.max,
        START: value.min,
      };
      console.log("Segmento", segmentsOrdened[segmentPosition]);
      setSegmentsOrdened([...segmentsOrdened]);
      const a = await updateSegment({
        variables: {
          ID: Number(segmentId),
          NAME: String(segmentsOrdened[segmentPosition].NAME),
          SEGMENT_TYPE: String(segmentsOrdened[segmentPosition].SEGMENT_TYPE),
          START: value.min,
          END: value.max,
          ORDER: Number(segmentsOrdened[segmentPosition].ORDER),
          FILE: String(segmentsOrdened[segmentPosition].FILE),
          TAG: String(segmentsOrdened[segmentPosition].TAG),
          THUMBNAIL: String(segmentsOrdened[segmentPosition].THUMBNAIL),
        },
      });
      console.log("ok", a);
    } catch (error) {
      console.log("error", error);
      Toast.fire({
        icon: "error",
        title: "Error al actualizar el segmento",
      });
    }
  };

  return (
    <Fragment>
      {segmentsOrdened &&
        videoDuration > 0 &&
        segmentsOrdened[segmentPosition]?.SEGMENT_TYPE === "VIDEO" &&
        segmentsOrdened.map((segment: { ID: React.Key }, index: number) => {
          console.log(segment);
          if (index === segmentPosition && tools === "CUT") {
            return (
              <Row key={segment.ID}>
                <Col size={4}></Col>
                <Col size={6}>
                  <RangeContainer key={segment.ID}>
                    <CustomRange
                      draggableTrack
                      minValue={0}
                      maxValue={Math.floor(videoDuration)}
                      value={value}
                      formatLabel={(value) => ƒparseTime(value as number)}
                      onChange={(value) => setValue(value as IRange)}
                      onChangeComplete={(value) =>
                        handleUpdate(value as IRange)
                      }
                    />
                  </RangeContainer>
                </Col>
              </Row>
            );
          }
        })}
    </Fragment>
  );
};

export default Range;
