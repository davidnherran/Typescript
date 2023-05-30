import React, { FC, useState } from "react";
import { CREATE_SEGMENT } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { getParamId } from "../../config";
import { NewSegmentProps } from "./newSegment.types";
import { useContent } from "../../context/ContentContext";
import Swal from "sweetalert2";
import {
  FormNewSegment,
  InputNewSegment,
  SelectNewSegment,
  ButtonNewSegment,
} from "./newSegment.styles";

const NewSegment: FC<NewSegmentProps> = ({
  ƒcloseModal,
}): JSX.Element | null => {
  const [createSegment] = useMutation(CREATE_SEGMENT);
  const [newSegment, setNewSegment] = useState({});
  const paramId = getParamId();

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

  const {
    segmentsOrdened,
    setGraphContextContent,
    graphContextContent,
    setSegmentPosition,
    forceUpdate,
    setSegmentsOrdened,
  } = useContent();

  const ƒcreateSegment = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewSegment({ ...newSegment, [e.target.name]: e.target.value ?? "VIDEO"});
  };

  const ƒsendSegment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
   
    await createSegment({
      variables: {
        NAME: newSegment.NAME,
        SEGMENT_TYPE: newSegment.SEGMENT_TYPE ?? "VIDEO",
        START: 0,
        END: 30,
        ORDER: segmentsOrdened.length,
        FILE: "EMPTY",
        TAG: "*",
        THUMBNAIL: "EMPTY",
        SEGMENT_PARENT: Number(paramId),
      },
    })
      .then(() => {
        const newSegmentArray = {
          NAME: newSegment.NAME,
          SEGMENT_TYPE: newSegment.SEGMENT_TYPE ?? "VIDEO",
          START: 0,
          END: 30,
          ORDER: segmentsOrdened.length,
          FILE: "EMPTY",
          TAG: "*",
          THUMBNAIL: "EMPTY",
          SEGMENT_PARENT: Number(paramId),
        };

        setGraphContextContent([...segmentsOrdened, newSegmentArray]);

        setSegmentPosition(graphContextContent.length);

        forceUpdate();

      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err,
        });
      });

    ƒcloseModal();
  };

  return (
    <FormNewSegment onSubmit={ƒsendSegment} style={{ display: "flex" }}>
      <InputNewSegment
        placeholder="Titulo del segmento"
        name="NAME"
        onChange={(e) => ƒcreateSegment(e)}
        autoComplete="off"
      />
      <SelectNewSegment name="SEGMENT_TYPE" required onChange={(e) => ƒcreateSegment(e)}>
        <option value="VIDEO">Video</option>
        <option value="IMAGEN">Imagen</option>
        <option value="AUDIO">Imagen con audio</option>
        <option value="RCM">RCM</option>
        <option value="SURVEY">Encuesta</option>
        <option value="TAGS">Etiquetas</option>
      </SelectNewSegment>
      <ButtonNewSegment type="submit">Crear</ButtonNewSegment>
    </FormNewSegment>
  );
};

export default NewSegment;
