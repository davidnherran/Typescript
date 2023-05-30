import React, { FC, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  TimelineWrapper,
  TimelineTab,
  ListOfSegments,
  DroppableProvided,
  DraggableItem,
  DraggableNewItem,
  TimelineActions,
} from "./timeline.styles";
import { trash1, copy1, plus } from "../../assets/icons";
import { useContent } from "../../context/ContentContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CONTENT_BY_ID } from "../../graphql/queries";
import { DELETE_SEGMENT, UPDATE_SEGEMENT_ORDER } from "../../graphql/mutations";
import { getParamId } from "../../../shared/functions";
import Swal from "sweetalert2";
import RCMIMAGE from "../../assets/icons/RCM.png";
import TAGS from "../../assets/icons/TAGS.png";
import ENCUESTAIMAGE from "../../assets/icons/ENCUESTA.png";
import { WisengineContent } from "../../../WisengineProvider";
import { selectTheme } from "../../theme";
import ImagePlaceholder from "../../assets/icons/placeholder.png";
import { getSegments } from "../../../WisengineProvider/services/getters";
import { WrapperProps } from "../wrapper/wrapper.types";

const Timeline: FC<
  Pick<WrapperProps, "isDndDisabled" | "contentData" | "ƒcreateSegment">
> = ({ contentData, ƒcreateSegment, isDndDisabled }) => {
  const {
    content,
    setSegmentPosition,
    segmentPosition,
    graphContextContent,
    setGraphContextContent,
    segmentsOrdened,
    setSegmentsOrdened,
  } = useContent();
  const { config } = WisengineContent();
  const [segments, setSegments] = useState(content.segments);
  const [id, setId] = useState("");

  const [odened, setOrdened] = useState([]);
  const [range, setRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    if (graphContextContent.length > 0) {
      setRange({
        min: graphContextContent[segmentPosition].START ?? 0,
        max: graphContextContent[segmentPosition].END ?? 0,
      });
    }
  }, [segmentPosition]);

  // DELETE_SEGMENT
  const [deleteSegment] = useMutation(DELETE_SEGMENT);

  // UPDATE_SEGEMENT_ORDER
  const [updateSegmentOrder, { loading: loadingOrder }] = useMutation(
    UPDATE_SEGEMENT_ORDER
  );

  const paramId = getParamId();

  const { data: datos, loading } = useQuery(GET_CONTENT_BY_ID, {
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

  useEffect(() => {
    if (datos) {
      const isDataEmpty = datos.getContent?.SEGMENTS?.length === 0;
      if (isDataEmpty) {
        setGraphContextContent([
          {
            NAME: "",
            SEGMENT_TYPE: "",
            START: 0,
            END: 0,
            ORDER: Number(segmentPosition),
            FILE: "",
            TAG: "",
            THUMBNAIL: "",
            SEGMENT_PARENT: Number(paramId),
          },
        ]);
      } else {
        setGraphContextContent(datos.getContent.SEGMENTS);
      }
    }
  }, [datos, loading]);

  useEffect(() => {
    if (contentData?._id) {
      setId(contentData._id);
    }
  }, [contentData]);

  useEffect(() => {
    if (contentData?._id) {
      setSegments(contentData.segments);
    }
  }, [contentData]);

  const ƒcreateNewSegment = () => {
    const newSegment = {
      NAME: "",
      SEGMENT_TYPE: "",
      START: "",
      END: "",
      ORDER: segmentsOrdened.length,
      FILE: "",
      TAG: "",
      THUMBNAIL: "",
      SEGMENT_PARENT: paramId,
    };

    setGraphContextContent([...graphContextContent, newSegment]);

    setSegmentPosition(graphContextContent.length);

    Toast.fire({
      icon: "success",
      title: "Nuevo segmento creado",
    });
  };

  const ƒduplicateSegment = () => {
    const newSegment = {
      NAME: graphContextContent[segmentPosition].NAME,
      SEGMENT_TYPE: graphContextContent[segmentPosition].SEGMENT_TYPE,
      START: graphContextContent[segmentPosition].START,
      END: graphContextContent[segmentPosition].END,
      ORDER: graphContextContent.length,
      FILE: graphContextContent[segmentPosition].FILE,
      TAG: graphContextContent[segmentPosition].TAG,
      THUMBNAIL: graphContextContent[segmentPosition].THUMBNAIL,
      SEGMENT_PARENT: paramId,
    };

    setGraphContextContent([...graphContextContent, newSegment]);

    setSegmentPosition(graphContextContent.length);

    Toast.fire({
      icon: "success",
      title: "Segmento duplicado correctamente",
    });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const ƒdeleteSegment = async () => {
    const segments = await getSegments();
    const segment = segments.filter(
      (seg) => seg.NAME === segmentsOrdened[segmentPosition].NAME
    );

    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás a punto de eliminar el segmento "${segment[0].NAME}", no podrás revertir esta acción`,
      icon: "warning",
      showCancelButton: true,
      iconColor: selectTheme(config.theme).modal.confirm,
      confirmButtonColor: selectTheme(config.theme).modal.confirm,
      cancelButtonColor: selectTheme(config.theme).modal.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteSegment({
          variables: {
            ID: Number(segment[0].ID),
          },
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: `${segment[0].NAME} fue eliminado`,
              iconColor: selectTheme(config.theme).modal.confirm,
              confirmButtonColor: selectTheme(config.theme).modal.confirm,
            });

            const newGraphContextContent = segmentsOrdened.filter(
              (item) => item.ID !== segment[0].ID && item.ID !== undefined
            );

            if (segmentPosition === segmentsOrdened.length - 1)
              setSegmentPosition(segmentPosition - 1);
            setSegmentsOrdened(newGraphContextContent);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    const ordened = reorder(segmentsOrdened, source.index, destination.index);

    setSegmentsOrdened(ordened);

    ordened.forEach(async (item, index) => {
      await updateSegmentOrder({
        variables: {
          ID: item["ID"],
          ORDER: index,
        },
      });
    });

    setSegmentPosition(destination.index);
  };

  useEffect(() => {
    if (graphContextContent) {
      const segmentsOrdened = graphContextContent
        .slice()
        .sort(
          (a: { ORDER: number }, b: { ORDER: number }) => a.ORDER - b.ORDER
        );
      setSegmentsOrdened(segmentsOrdened);
    }
  }, [graphContextContent]);

  return (
    <div>
      <TimelineWrapper>
        <TimelineTab>
          <h3>{segmentsOrdened[segmentPosition]?.NAME}</h3> 
        </TimelineTab>
        <ListOfSegments>
          <DragDropContext
            onDragEnd={(result) => {
              onDragEnd(result);
            }}
          >
            <Droppable
              droppableId="tasks"
              direction="horizontal"
              isDropDisabled={isDndDisabled}
            >
              {(droppableProvided) => (
                <DroppableProvided
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  {segmentsOrdened.map((task, index) => {
                    if (segmentsOrdened[0]?.NAME !== "") {
                      return (
                        <Draggable
                          key={`${task.ID}`}
                          draggableId={`${task.ID}`}
                          index={index}
                          isDragDisabled={isDndDisabled}
                        >
                          {(draggableProvided) => (
                            <DraggableItem
                              {...draggableProvided.draggableProps}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.dragHandleProps}
                              active={segmentPosition === index}
                            >
                              <img
                                src={
                                  task.SEGMENT_TYPE === "RCM"
                                    ? RCMIMAGE
                                    : task.SEGMENT_TYPE === "SURVEY"
                                    ? ENCUESTAIMAGE
                                    : task.SEGMENT_TYPE === "VIDEO"
                                    ? "https://resources.construx.com/wp-content/uploads/2016/08/video-placeholder-brain-bites.png"
                                    : task.SEGMENT_TYPE === "TAGS"
                                    ? TAGS
                                    : task.SEGMENT_TYPE === "IMAGEN"
                                    ? task.FILE !== "EMPTY"
                                      ? task.FILE
                                      : ImagePlaceholder
                                    : null
                                }
                                onClick={() => {
                                  setSegmentPosition(Number(index));
                                }}
                              />
                            </DraggableItem>
                          )}
                        </Draggable>
                      );
                    }
                  })}
                  {droppableProvided.placeholder}
                </DroppableProvided>
              )}
            </Droppable>
          </DragDropContext>
          {config.theme !== "harmony" && (
            <DraggableNewItem onClick={ƒcreateSegment}>
              <img src={plus} alt="plus" />
            </DraggableNewItem>
          )}
        </ListOfSegments>
      </TimelineWrapper>
      <TimelineActions>
        <img src={trash1} onClick={ƒdeleteSegment} />
        <img src={copy1} onClick={ƒduplicateSegment} />
      </TimelineActions>
    </div>
  );
};

export default Timeline;
