import React, { useEffect } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@apollo/client";
import { useContent } from "../../context/ContentContext";
import { CREATE_SEGMENT, UPDATE_SEGMENT } from "../../graphql/mutations";
import { GET_CONTENT_BY_ID } from "../../graphql/queries";
import { getParamId } from "../../config";
import Swal from "sweetalert2";

const SegmentForm = () => {
  const {
    segmentPosition,
    setUploadProgress,
    setSegmentType,
    segmentsOrdened,
    setSegmentsOrdened,
  } = useContent();
  const [createSegment] = useMutation(CREATE_SEGMENT);
  const [updateSegment] = useMutation(UPDATE_SEGMENT);

  const paramId = getParamId();

  const { data: datos } = useQuery(GET_CONTENT_BY_ID, {
    variables: { ID: paramId },
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createSegment({
      variables: {
        NAME: segmentsOrdened[segmentPosition].NAME,
        SEGMENT_TYPE: segmentsOrdened[segmentPosition].SEGMENT_TYPE,
        START: Number(segmentsOrdened[segmentPosition].START),
        END: Number(segmentsOrdened[segmentPosition].END),
        ORDER: Number(segmentPosition),
        FILE: segmentsOrdened[segmentPosition].FILE,
        TAG: segmentsOrdened[segmentPosition].TAG,
        THUMBNAIL: segmentsOrdened[segmentPosition].THUMBNAIL,
        SEGMENT_PARENT: Number(paramId),
      },
    });

    Toast.fire({
      icon: "success",
      title: "Nuevo segmento creado",
    });
  };

  const handleArrayUpdate = (event, index) => {
    const { name: key, value } = event;

    if (key === undefined && value === undefined) {
      const rcm = event.target.value;
      const newSegments = segmentsOrdened.slice();
      newSegments[index].FILE = rcm;
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

  const generateThumbnail = async (thumbnail, index) => {
    //convert thumbnail to blob

    const existingThumbnail = segmentsOrdened[segmentPosition].THUMBNAIL;
    //console.log(existingThumbnail)
    if (existingThumbnail) return;

    const response = await fetch(thumbnail);
    const blob = await response.blob();
    const file = new File([blob], "thumbnail.png", { type: "image/png" });

    const data = new FormData();
    data.append("file", file);
    const sendFile = await axios({
      method: "post",
      url: "https://devs.wisengine.co:8010/api/cmgt/s3",
      headers: {
        "Authorization": `Api-Key ${localStorage.getItem("CMGT_TOKEN")}`,
      },
      data,
    });
    console.log("Se creo un nuevo thumbnail");
    handleArrayUpdate({ name: "THUMBNAIL", value: sendFile.data.data }, index);
  };

  const handleChangeFile = async (e, index) => {
    const { value } = e.target;
    if (!value) return;
    try {
      const data = new FormData();
      data.append("file", value);
      const sendFile = await axios({
        method: "post",
        url: "https://devs.wisengine.co:8010/api/cmgt/s3",
        headers: {
          "Authorization": `Api-Key ${localStorage.getItem("CMGT_TOKEN")}`,
        },
        data,
        onUploadProgress: (progress) => {
          const { loaded, total } = progress;
          let percent = Math.floor((loaded * 100) / total);
          setUploadProgress(percent);
        },
      });
      alert("creado");
      setUploadProgress(0);
      handleArrayUpdate({ name: "FILE", value: sendFile.data.data }, index);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleUpdate = async () => {
    const segmentId = segmentsOrdened[segmentPosition].ID;

    await updateSegment({
      variables: {
        ID: Number(segmentId),
        NAME: String(segmentsOrdened[segmentPosition].NAME),
        SEGMENT_TYPE: String(segmentsOrdened[segmentPosition].SEGMENT_TYPE),
        START: Number(segmentsOrdened[segmentPosition].START),
        END: Number(segmentsOrdened[segmentPosition].END),
        ORDER: Number(segmentsOrdened[segmentPosition].ORDER),
        FILE: String(segmentsOrdened[segmentPosition].FILE),
        TAG: String(segmentsOrdened[segmentPosition].TAG),
        THUMBNAIL: String(segmentsOrdened[segmentPosition].THUMBNAIL),
      },
    }).then(() => {
      Toast.fire({
        icon: "success",
        title: `Segmento ${String(
          segmentsOrdened[segmentPosition].SEGMENT_TYPE
        )} Actualizado`,
      });
    });
  };

  useEffect(() => {
    setSegmentType(segmentsOrdened[segmentPosition]?.SEGMENT_TYPE ?? "");
    return () => {
      setSegmentType("");
    };
  }, [segmentPosition]);

  if (!segmentsOrdened[0]) return;

  return (
    <div>
      {/* <form onSubmit={handleSubmit} style={{ width: "90%" }}>
        <input
          className="contentmanager__formcontrol_input"
          type="text"
          name="NAME"
          readOnly={false}
          placeholder="Nombre del segmento"
          value={segmentsOrdened[segmentPosition]?.NAME}
          autoComplete="off"
          style={{ width: "25%" }}
          onChange={({ target }) => handleArrayUpdate(target, segmentPosition)}
        />
        <select
          className="contentmanager__formcontrol_input"
          name="SEGMENT_TYPE"
          value={segmentsOrdened[segmentPosition]?.SEGMENT_TYPE}
          style={{ backgroundColor: "transparent", width: "20%" }}
          onChange={({ target }) => {
            handleArrayUpdate(target, segmentPosition);
            setSegmentType(target.value);
          }}
          required
        >
          <option>Tipo de segmento</option>
          <option value="VIDEO">Video</option>
          <option value="IMAGE">Imagen</option>
          <option value="AUDIO">Imagen con audio</option>
          <option value="RCM">RCM</option>
          <option value="SURVEY">Encuesta</option>
          <option value="TAGS">Etiquetas</option>
        </select>
        <input
          className="contentmanager__formcontrol_input"
          type="text"
          name="TAG"
          placeholder="Etiqueta"
          value={segmentsOrdened[segmentPosition]?.TAG}
          autoComplete="off"
          onChange={({ target }) => handleArrayUpdate(target, segmentPosition)}
        />
        {segmentsOrdened[segmentPosition]?.SEGMENT_TYPE !== "RCM" && (
          <div style={{ maxWidth: "100px" }}>
            <input
              type="file"
              name="FILE"
              autoComplete="off"
              onChange={(e) =>
                handleChangeFile(
                  {
                    target: {
                      name: "FILE",
                      value: e.target.files[0],
                    },
                  },
                  segmentPosition
                )
              }
            />
          </div>
        )}
        <div style={{ display: "none" }}>
          <VideoThumbnail
            videoUrl={segmentsOrdened[segmentPosition]?.FILE ?? ""}
            renderThumbnail={false}
            thumbnailHandler={(thumbnail) => {
              generateThumbnail(thumbnail, segmentPosition);
            }}
          />
        </div>
        {datos?.getContent.SEGMENTS[segmentPosition]?.FILE === undefined && (
          <button type="submit">CREAR CONTENIDO</button>
        )}
        {segmentsOrdened[segmentPosition]?.FILE !== "" &&
          datos?.getContent.SEGMENTS[segmentPosition]?.FILE !== undefined && (
            <button type="button" onClick={handleUpdate}>
              ACTUALIZAR CONTENIDO
            </button>
          )}
      </form> */}
    </div>
  );
};

export default SegmentForm;
