import React from "react";
import { Coverage, CoverTitle } from "./cover.style";
import { WisengineContent } from "../../../../WisengineProvider";
import Swal from "sweetalert2";

const Cover = ({
  ID = "",
  COVER = "",
  NAME = "",
}): JSX.Element => {
  const { config } = WisengineContent();

  const redirectHarmony = (routePure: string) => {
    localStorage.setItem("contentId", ID.trim());
    const route = routePure.replace(new RegExp(":id", "g"), ID.trim());
    window.location.href = route;

  };

  const handleDeleteContent = () => {
    
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el contenido "${NAME}"`,
      icon: "warning",
      showCancelButton: true,
      iconColor: config.customColor || "#ff7e4f",
      confirmButtonColor: config.customColor || "#ff7e4f",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // await deleteSegment({
        //   variables: {
        //     ID: Number(segment[0].ID),
        //   },
        // })
        //   .then(() => {
        //     Swal.fire({
        //       icon: "success",
        //       title: `${segment[0].NAME} fue eliminado`,
        //       iconColor: selectTheme(config.theme).modal.confirm,
        //       confirmButtonColor: selectTheme(config.theme).modal.confirm,
        //     });

        //     const newGraphContextContent = segmentsOrdened.filter(
        //       (item) => item.ID !== segment[0].ID && item.ID !== undefined
        //     );

        //     if (segmentPosition === segmentsOrdened.length - 1)
        //       setSegmentPosition(segmentPosition - 1);
        //     setSegmentsOrdened(newGraphContextContent);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }
    });
  }

  return (
    <Coverage data-testid="cover">
      <div
        style={{
          width: "30px",
          height: "30px",
          position: "absolute",
          transform: "translate(122px, 60px)",
          borderRadius: "0px 0px 12px 0px",
        }}
        onClick={() => redirectHarmony(config.routes.manager)}
      >
        <img
          src="https://cdn.pixabay.com/photo/2017/06/06/00/33/edit-icon-2375785_1280.png"
          style={{ width: "60%", height: "60%", margin: "20%" }}
        />
      </div>
      <div
        style={{
          width: "30px",
          height: "30px",
          position: "absolute",
          transform: "translate(100px, 60px)",
          borderRadius: "0px 0px 12px 0px",
          visibility: "hidden",
        }}
        onClick={handleDeleteContent}
      >
        <img
          src="https://cdn.icon-icons.com/icons2/1880/PNG/512/iconfinder-trash-4341321_120557.png"
          style={{ width: "62%", height: "62%", margin: "20%" }}
        />
      </div>
      <img
        loading="lazy"
        src={COVER}
        onClick={() => redirectHarmony(config.routes.viewer)}
      />
      <CoverTitle>{NAME}</CoverTitle>
    </Coverage>
  );
};

export default Cover;
