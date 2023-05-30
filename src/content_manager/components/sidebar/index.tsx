import React, { FC, useState, useEffect } from "react";
import { pined, plus, media, galery } from "../../assets/icons";
import { buttonsList } from "../buttons/buttonsList";
import Button from "../buttons";
import {
  Side,
  Controls,
  SideTab,
  SideSearch,
  EmptyAlert,
} from "./sidebar.styles";
import { useContent } from "../../context/ContentContext";
import { Row, Col } from "../grid";
import { IButton } from "./sidebar.types";
import { useMutation } from "@apollo/client";
import { UPDATE_SEGMENT } from "../../graphql/mutations";
import { getSegments } from "../../../WisengineProvider/services/getters";

const Sidebar: FC = (): JSX.Element | null => {
  const [updateSegment] = useMutation(UPDATE_SEGMENT);

  const {
    segmentType,
    setTools,
    setSegmentsOrdened,
    segmentsOrdened,
    segmentPosition,
    uploadProgress,
    setUploadProgress,
  } = useContent();
  const [files, setFiles] = useState([]);

  const getSessionStorage = () => {
    const files = sessionStorage.getItem("files");
    if (files) {
      setFiles(JSON.parse(files));
    }
  };

  useEffect(() => {
    getSessionStorage();
    setTimeout(() => {
      getSessionStorage();
    }, 2000);
  }, [uploadProgress]);

  const updateLibraryFile = async () => {
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
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const setLibraryFile = async (e) => {

    const segments = await getSegments();

    const segment = segments.filter(
      (seg) => seg.NAME === segmentsOrdened[segmentPosition].NAME
    );
    const newSegments = segmentsOrdened.map((segment, i) => {
      if (i === segmentPosition) {
        return { ...segment, FILE: e };
      }
      return segment;
    });

    setSegmentsOrdened(newSegments);

    await updateSegment({
      variables: {
        ID: segment[0].ID,
        NAME: segmentsOrdened[segmentPosition].NAME,
        SEGMENT_TYPE: segmentsOrdened[segmentPosition].SEGMENT_TYPE,
        START: segmentsOrdened[segmentPosition].START,
        END: segmentsOrdened[segmentPosition].END,
        ORDER: segmentsOrdened[segmentPosition].ORDER,
        FILE: e,
        TAG: segmentsOrdened[segmentPosition].TAG,
        THUMBNAIL: segmentsOrdened[segmentPosition].THUMBNAIL ?? "EMPTY",
        SEGMENT_PARENT: segmentsOrdened[segmentPosition].SEGMENT_PARENT,
      },
    })
      .then((res) => {
        
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Side>
      <Row>
        <Col size={10}>
          <h2>Herramientas de segmentos</h2>
        </Col>
        <Col size={2} justify="flex-end">
          <img src={pined} alt="pined" />
        </Col>
      </Row>
      <Controls>
        {segmentType !== "" ? (
          buttonsList
            .filter((trigger) => trigger.type.includes(segmentType))
            .map((button: IButton) => (
              <Button
                key={button.id}
                icon={button.icon}
                title={button.title}
                onClick={() => setTools(button.name)}
              />
            ))
        ) : (
          <EmptyAlert>Para comenzar agrega un nuevo segmento</EmptyAlert>
        )}
      </Controls>
      <SideTab>Recursos</SideTab>
      <SideSearch>
        <input placeholder="Search" type="text" />
        <img src={plus} />
        <img src={media} />
        <img src={galery} />
      </SideSearch>
      <div
        style={{
          height: "34vh",
          overflowY: "scroll",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {files.map((file: any, index: number) => (
          <div
            key={index}
            style={{
              borderRadius: "4px",
              width: "40%",
              margin: "10px",
              padding: "4px",
              height: "90px",
              backgroundImage: `url(${
                file.split(".").at(-1) === "png" ||
                file.split(".").at(-1) === "jpg" ||
                file.split(".").at(-1) === "jpeg"
                  ? file
                  : file.split(".").at(-1) === "mp3"
                  ? "https://t3.ftcdn.net/jpg/03/65/40/86/360_F_365408617_YhuR0K85yUUHWYgGXEHEaej7qpca2gRR.jpg"
                  : "https://cdn.dribbble.com/users/2479503/screenshots/6402160/placeholder.png"
              })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              cursor: "pointer",
            }}
            onClick={() => setLibraryFile(file)}
          ></div>
        ))}
      </div>
    </Side>
  );
};

export default Sidebar;
