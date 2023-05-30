import React, { FC, Fragment } from "react";
import { useContent } from "../../../context/ContentContext";
import RcmEditor from "../../../../rcm_editor";
import RcmViewer from "../../../../rcm_viewer";
import Editor from "@monaco-editor/react";
import { useMutation } from "@apollo/client";
import { UPDATE_SEGMENT } from "../../../graphql/mutations";
import { Toast } from "../../../services/moduleServices";

const PreviewRCM: FC = () => {
  const { tools, segmentsOrdened, segmentPosition, setSegmentsOrdened } =
    useContent();
  const [updateSegment] = useMutation(UPDATE_SEGMENT);

  const varValues = [
    "{NOMBRE}",
    "{INGRESOS}",
    "{EDAD}",
    "{SEXO}",
    "{EGRESOS}",
    "{SALUDO}",
    "{CIUDAD}",
    "{PAIS}",
    "{MONEDA}",
    "{IP}",
    "{NUBES}",
    "{TEMPERATURA}",
    "{HUMEDAD}",
    "{PRESION}",
  ];
  const anValues = ["{AN-1001}", "{AN-1002}"];
  const anLabels = ["Predición Acuerdo", "Predición Acuerdo DL"];
  const dtValues = ["{DT-1601}"];
  const dtLabels = ["Prueba"];

  const handleArrayUpdate = (event, index) => {
    const { name: key, value } = event;

    if (key === undefined && value === undefined) {
      const rcm = event.target.value;
      if (segmentsOrdened[segmentPosition]?.FILE) {
        setSegmentsOrdened([
          ...segmentsOrdened.slice(0, segmentPosition),
          {
            ...segmentsOrdened[segmentPosition],
            FILE: rcm,
          },
          ...segmentsOrdened.slice(segmentPosition + 1),
        ]);
      } else {
        const newSegments = segmentsOrdened.slice();
        newSegments[index].FILE = rcm;
      }
    } else {
      const newSegments = segmentsOrdened.map((segment, i) => {
        if (i === index) {
          return { ...segment, [key]: value };
        }
        return segment;
      });

      setSegmentsOrdened(newSegments);
    }
  };

  const updateRCM = async () => {
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
        Toast.fire({
          icon: "success",
          title: "RCM actualizado",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "success",
          title: err,
        });
      });
  };

  return (
    <Fragment>
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
          {tools === "RCM_PURE" || tools === "" ? "Editor RCM" : "Editor HTML"}
        </h2>
        {tools === "RCM_PURE" || tools === "CONFIG" || tools === "" ? (
          <div>
            {segmentsOrdened.map((segment, index) => {
              if (index === segmentPosition) {
                return (
                  <div key={index}>
                    <RcmEditor
                      
                      content={segment.FILE ?? ""}
                      updateContent={(content) => {
                        handleArrayUpdate(
                          {
                            target: {
                              name: "FILE",
                              value: content,
                            },
                          },
                          segmentPosition
                        );
                      }}
                      varTitle={"Variables"}
                      anTitle={"Analíticas"}
                      dtTitle={"Tabla Decisión"}
                      varValues={varValues}
                      anValues={anValues}
                      anLabels={anLabels}
                      dtValues={dtValues}
                      dtLabels={dtLabels}
                    />
                    <h2
                      style={{
                        color: "#333333",
                        fontSize: "22px",
                        width: "100%",
                        textAlign: "center",
                        margin: "25px",
                      }}
                    >
                      Vista previa
                    </h2>
                    <div
                      style={{
                        border: "solid 1px lightgray",
                        borderRadius: "8px",
                        width: "100%",
                        minHeight: "200px",
                        padding: "10px",
                      }}
                    >
                      <RcmViewer content={segment.FILE ?? ""} />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          tools === "RCM_HTML" && (
            <div>
              {segmentsOrdened.map((segment, index) => {
                if (index === segmentPosition) {
                  return (
                    <div
                      style={{
                        border: "solid 1px #B7B7B7",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                      key={index}
                    >
                      <Editor
                        height="30vh"
                        theme="vs-light"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 18,
                          fontFamily: "Roboto",
                        }}
                        defaultLanguage="html"
                        defaultValue={segment.FILE}
                        onChange={(content) => {
                          handleArrayUpdate(
                            {
                              target: {
                                name: "FILE",
                                value: content,
                              },
                            },
                            segmentPosition
                          );
                        }}
                      />
                    </div>
                  );
                }
              })}
              <iframe
                srcDoc={segmentsOrdened[segmentPosition]?.FILE}
                style={{
                  width: "100%",
                  height: "30vh",
                  border: "solid 1px #B7B7B7",
                  borderRadius: "10px",
                }}
              ></iframe>
            </div>
          )
        )}
        <button
          onClick={updateRCM}
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
        >
          Guardar RCM
        </button>
      </div>
    </Fragment>
  );
};

export default PreviewRCM;
