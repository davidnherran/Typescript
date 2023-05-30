import React, { FC } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_SEGMENT } from "../../graphql/mutations";
import { useContent } from "../../context/ContentContext";
import {
  InputConfigure,
  SelectConfigure,
  ButtonConfigure,
} from "./configure.styles";
import { WisengineContent } from "../../../WisengineProvider";

const Configure: FC = () => {
  const { segmentPosition, segmentsOrdened, setSegmentsOrdened, tools } =
    useContent();
  const [updateSegment] = useMutation(UPDATE_SEGMENT);
  const {
    config: { theme },
  } = WisengineContent();

  const handleArrayUpdate = (event, index) => {
    const { name: key, value } = event;

    const newSegments = segmentsOrdened.map((segment, i) => {
      if (i === index) {
        return { ...segment, [key]: value };
      }
      return segment;
    });

    setSegmentsOrdened(newSegments);
  };

  const ƒupdateConfig = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateSegment({
      variables: {
        ID: segmentsOrdened[segmentPosition].ID,
        NAME: segmentsOrdened[segmentPosition].NAME,
        SEGMENT_TYPE: segmentsOrdened[segmentPosition].SEGMENT_TYPE,
        START: segmentsOrdened[segmentPosition].START,
        END: segmentsOrdened[segmentPosition].END,
        ORDER: segmentsOrdened[segmentPosition].ORDER,
        FILE: segmentsOrdened[segmentPosition].FILE,
        TAG: segmentsOrdened[segmentPosition].TAG,
        THUMBNAIL: segmentsOrdened[segmentPosition].THUMBNAIL ?? "EMPTY",
        SEGMENT_PARENT: segmentsOrdened[segmentPosition].SEGMENT_PARENT,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={ƒupdateConfig}>
      {segmentsOrdened.map(
        (
          segment: {
            ID: React.Key;
            NAME: string;
            SEGMENT_TYPE: "VIDEO" | "IMAGEN" | "AUDIO" | "RCM" | "SURVEY";
            TAGS;
          },
          index: number
        ) => {
          if (index === segmentPosition && tools === "CONFIG") {
            return (
              <div key={index}>
                <InputConfigure
                  name="NAME"
                  value={segment.NAME}
                  onChange={({ target }) =>
                    handleArrayUpdate(target, segmentPosition)
                  }
                  autoComplete="off"
                  readOnly={theme === "harmony"}
                />
                <SelectConfigure
                  name="SEGMENT_TYPE"
                  value={segment.SEGMENT_TYPE}
                  onChange={({ target }) =>
                    handleArrayUpdate(target, segmentPosition)
                  }
                >
                  <option value="VIDEO">Video</option>
                  <option value="IMAGEN">Imagen</option>
                  <option value="AUDIO">Imagen con audio</option>
                  <option value="RCM">RCM</option>
                  <option value="SURVEY">Encuesta</option>
                  <option value="TAGS">Etiquetas</option>
                </SelectConfigure>
                <ButtonConfigure type="submit">✓</ButtonConfigure>
              </div>
            );
          }
        }
      )}
    </form>
  );
};

export default Configure;
