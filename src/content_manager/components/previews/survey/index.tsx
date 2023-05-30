import React, { FC, useState, useEffect } from "react";
import { CREATE_SURVEY } from "../../../../shared/graphql/schema/mutations/survey";
import { GET_CONTENT_BY_ID } from "../../../graphql/queries";
import { GET_ALL_SURVEYS } from "../../../../shared/graphql/schema/queries/survey";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_SEGMENT } from "../../../graphql/mutations";
import { useContent } from "../../../context/ContentContext";
import { getParamId } from "../../../config";
import { Toast } from "../../../services/moduleServices";

const PreviewTags: FC = () => {
  const { segmentPosition, segmentsOrdened, setSegmentsOrdened } = useContent();
  const [updateSegment] = useMutation(UPDATE_SEGMENT);
  const [survey, setSurvey] = useState([]);
  const [surveyCounter, setSurveyCounter] = useState(0);
  const [createSurvey] = useMutation(CREATE_SURVEY);
  const [segmentId, setSegmentId] = useState(0);

  const paramId = getParamId();

  const { data: datos } = useQuery(GET_CONTENT_BY_ID, {
    variables: { ID: paramId },
  });

  const { data: surveyData } = useQuery(GET_ALL_SURVEYS);

  useEffect(() => {
    if (surveyData?.getAllSurveys.length > 0) {
      const getSurveys = surveyData?.getAllSurveys.filter(
        (item) =>
          item.SEGMENT_ID ===
          Number(datos?.getContent.SEGMENTS[segmentPosition]?.ID)
      );

      setSurvey(getSurveys);
    }
  }, [surveyData, segmentPosition]);

  useEffect(() => {
    if (datos?.getContent) {
      setSegmentId(datos?.getContent.SEGMENTS[segmentPosition]?.ID ?? 0);
    }
  }, [datos, segmentPosition]);

  const handleSurveyChange = (event, index) => {
    const { name: key, value } = event;

    const newSurvey = survey.map((segment, i) => {
      if (i === index) {
        return { ...segment, [key]: value };
      }
      return segment;
    });

    setSurvey(newSurvey);
  };

  const createSurveyBlock = () => {
    setSurvey([
      ...survey,
      {
        SEGMENT_ID: Number(segmentId ?? 0),
        QUESTION: "remove",
        ANSWER: "",
        IS_CORRECT: false,
      },
    ]);
    setSurveyCounter(surveyCounter + 1);
  };

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

  const ƒcreateTags = async () => {
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
        THUMBNAIL: segmentsOrdened[segmentPosition].THUMBNAIL,
        SEGMENT_PARENT: segmentsOrdened[segmentPosition].SEGMENT_PARENT,
      },
    });

    survey.forEach(async (item, index) => {
      if (item.ID === undefined) {
        await createSurvey({
          variables: {
            SEGMENT_ID: Number(datos?.getContent.SEGMENTS[segmentPosition]?.ID),
            QUESTION: item.QUESTION,
            ANSWER: item.ANSWER,
            IS_CORRECT: Boolean(item.IS_CORRECT),
          },
        })
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Guardado correctamente",
            });
          })
          .catch((err) => {
            Toast.fire({
              icon: "error",
              title: err,
            });
          });
      }
    });
  };

  console.log(survey);

  return (
    <div
      style={{
        width: "100%",
        padding: "2%",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <h2
        style={{
          color: "#333333",
          fontSize: "22px",
          width: "100%",
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Encuesta
      </h2>
      {segmentsOrdened.map((segment: { ID: React.Key }, index: number) => {
        if (index === segmentPosition) {
          return (
            <input
              key={segment.ID}
              placeholder={`Enunciado`}
              style={{
                width: "90%",
                marginLeft: "5%",
                marginBottom: "10px",
                height: "32px",
                borderRadius: "4px",
                border: "solid 1px lightgray",
                paddingLeft: "8px",
              }}
              name="FILE"
              value={segment.FILE}
              onChange={({ target }) =>
                handleArrayUpdate(target, segmentPosition)
              }
              autoComplete="off"
              className="contentmanager__formcontrol_input"
            />
          );
        }
      })}

      {segmentsOrdened.map((segment: { ID: React.Key }, index: number) => {
        if (index === segmentPosition) {
          return (
            <div key={segment.ID}>
              {survey
                ?.sort((a, b) => a.ID - b.ID)
                .map((item, index) => (
                  <div key={index} style={{ display: "flex" }}>
                    <input
                      placeholder={`Respuesta ${index + 1}`}
                      value={item?.ANSWER}
                      style={{
                        width: "60%",
                        marginLeft: "5%",
                        marginBottom: "10px",
                        height: "32px",
                        borderRadius: "4px",
                        border: "solid 1px lightgray",
                        paddingLeft: "8px",
                      }}
                      name="ANSWER"
                      onChange={({ target }) =>
                        handleSurveyChange(target, index)
                      }
                      autoComplete="off"
                      className="contentmanager__formcontrol_input"
                    />
                    <select
                      name="IS_CORRECT"
                      onChange={({ target }) =>
                        handleSurveyChange(target, index)
                      }
                      value={item?.IS_CORRECT}
                      style={{
                        width: "29%",
                        marginLeft: "1%",
                        marginBottom: "10px",
                        height: "32px",
                        borderRadius: "4px",
                        border: "solid 1px lightgray",
                        paddingLeft: "8px",
                      }}
                    >
                      <option value="true">Correcta</option>
                      <option value="false">Incorrecta</option>
                    </select>
                  </div>
                ))}
            </div>
          );
        }
      })}

<div style={{ width: "100%", display: "flex", paddingLeft: "5%" }}>
        <button
          style={{
            height: "32px",
            borderRadius: "16px",
            backgroundColor: "#999999",
            outline: "none",
            border: "none",
            color: "white",
            marginTop: "16px",
            padding: "autio 16px",
          }}
          type="button"
          onClick={createSurveyBlock}
        >
          Agregar Respuesta
        </button>
        <button
          style={{
            height: "32px",
            borderRadius: "16px",
            backgroundColor: "#999999",
            outline: "none",
            border: "none",
            color: "white",
            marginTop: "16px",
            padding: "autio 16px",
            marginLeft: "10px",
          }}
          type="button"
          onClick={ƒcreateTags}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default PreviewTags;
