import React, { useState, useEffect } from "react";
import { ButtonsRight, ButtonsLeft } from "../common/button/buttons";
import { useControls } from "../../context/ControlsContext";
import { play, pause, expand, volume } from "../../assets/icons";
import { Button } from "../";
import { ControlsContainer, Actions, Action } from "./controls.styles";
import { WisengineContent } from "../../../WisengineProvider";

const Controls = ({ content, position, parentWidth }) => {
  const numberOfSegments = content[0].SEGMENTS.length - 1;
  const [seconds, setSeconds] = useState(0);
  const { config } = WisengineContent();

  const {
    segmentPosition,
    setSegmentPosition,
    containerWidth,
    showIndextable,
    setShowIndextable,
    setIsFullscreen,
    isFullscreen,
    videoPlayer,
    configureControl,
    setConfigureControl,
    videoTrack,
    hoverVolume,
    setHoverVolume,
    playVideo,
    onPause,
  } = useControls();
  const aspectRatio = 9 / 16;
  const controlHeight = 90;

  const cviewer = document.getElementById("cviewer");

  var elem = document.documentElement;

  const handleClick = (action) => {
    if (action === "Play") {
      // play video
      playVideo(videoPlayer);

      // if (videoPlayer.paused()) {
      //   videoPlayer.play();
      //   setOnPause(false);
      // } else {
      //   videoPlayer.pause();
      //   setOnPause(true);
      // }
    }

    if (action === "Atras" && segmentPosition > 0) {
      setSegmentPosition(segmentPosition - 1);
      localStorage.setItem(
        "event",
        "[{origin: 'controls', action: 'Atras', segmentPosition: " +
          segmentPosition +
          "}]"
      );
    }

    if (action === "Siguiente" && segmentPosition < numberOfSegments) {
      setSegmentPosition(segmentPosition + 1);
      localStorage.setItem(
        "event",
        "[{origin: 'controls', action: 'Siguiente', segmentPosition: " +
          segmentPosition +
          "}]"
      );
    }

    if (action === "Indice") {
      setShowIndextable(!showIndextable);
      localStorage.setItem(
        "event",
        "[{origin: 'controls', action: 'Indice', showIndextable: " +
          showIndextable +
          "}]"
      );
    }

    if (action === "Configuracion") {
      setConfigureControl(!configureControl);
      localStorage.setItem(
        "event",
        "[{origin: 'controls', action: 'Configuracion', configureControl: " +
          configureControl +
          "}]"
      );
    }
     if (action === "Editar") {
       window.location.href = `editor/${localStorage.getItem('contentId')}`;
     }

    if (action === "Defaultscreen") {
      // if (document.exitFullscreen) {
      //   document.exitFullscreen();
      // } else if (document.mozCancelFullScreen) {
      //   document.mozCancelFullScreen();
      // } else if (document.webkitExitFullscreen) {
      //   document.webkitExitFullscreen();
      // } else if (document.msExitFullscreen) {
      //   window.top.document.msExitFullscreen();
      // }
      setIsFullscreen(false);
    }

    if (action === "Fullscreen") {
      // if (document.webkitFullscreenElement) {
      // if (!isFullscreen) {
      // if (elem.requestFullscreen) {
      //   elem.requestFullscreen();
      // } else if (elem.mozRequestFullScreen) {
      //   /* Firefox */
      //   elem.mozRequestFullScreen();
      // } else if (elem.webkitRequestFullscreen) {
      //   /* Chrome, Safari & Opera */
      //   elem.webkitRequestFullscreen();
      // } else if (elem.msRequestFullscreen) {
      //   /* IE/Edge */
      //   elem = window.top.document.body; //To break out of frame in IE
      //   elem.msRequestFullscreen();
      // }
      setIsFullscreen(true);
      // } else {
      //   if (document.exitFullscreen) {
      //     document.exitFullscreen();
      //   } else if (document.mozCancelFullScreen) {
      //     document.mozCancelFullScreen();
      //   } else if (document.webkitExitFullscreen) {
      //     document.webkitExitFullscreen();
      //   } else if (document.msExitFullscreen) {
      //     window.top.document.msExitFullscreen();
      //   }
      //   setIsFullscreen(false);
      // }
    }
    return false;
  };

  const myFunction = () => {
    // your logic here
    console.log("pressed Esc ✅");
    setIsFullscreen(false);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);

      if (event.key === "Escape") {
        event.preventDefault();

        // 👇️ your logic here
        myFunction();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const newWidth = `${containerWidth}px`;

  const newMargin = `${containerWidth * aspectRatio - controlHeight}`;

  setTimeout(() => {
    if (
      seconds <
      content[0].SEGMENTS[segmentPosition]?.END -
        content[0].SEGMENTS[segmentPosition]?.START
    )
      setSeconds(seconds + 0.1);
  }, 100);

  const ƒparseTime = (value) => {
    if (content[0].SEGMENTS[segmentPosition]?.START > videoTrack) return "0:00";
    if (content[0].SEGMENTS[segmentPosition]?.SEGMENT_TYPE === "VIDEO") {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } else {
      return;
    }
  };

  const handleOver = (action:string) => {
    if (action === "Volume") {
      setHoverVolume(true);
    }
  };

  return (
    <ControlsContainer parentWidth={parentWidth}>
      {parentWidth > 879 && (
        <span>{content[0].SEGMENTS[segmentPosition]?.NAME}</span>
      )}
      <Actions>
        <Action>
          {onPause ? (
            <Button
              tooltip={"Play"}
              icon={play}
              handleClick={() => handleClick("Play")}
            />
          ) : (
            <Button
              tooltip={"Pause"}
              icon={pause}
              handleClick={() => handleClick("Play")}
            />
          )}
          {ButtonsLeft.map((button) => (
            <Button
              key={button.name}
              tooltip={button.name}
              icon={button.icon}
              handleClick={() => handleClick(button.name)}
            />
          ))}
          <Button
            tooltip={"Volume"}
            icon={volume}
            handleClick={() => handleClick("Volume")}
            onMouseOver={() => handleOver("Volume")}
          />
          <div
            style={{
              marginLeft: "10px",
              color: "white",
              fontFamily: "sans-serif",
            }}
          >
            {ƒparseTime(
              videoTrack - content[0].SEGMENTS[segmentPosition]?.START
            )}
          </div>
        </Action>
        <Action position="end">
          {ButtonsRight.map((button) => (
            <Button
              key={button.name}
              tooltip={button.name}
              icon={button.icon}
              handleClick={() => handleClick(button.name)}
            />
          ))}
          {isFullscreen ? (
            <Button
              tooltip={"Fullscreen"}
              icon={expand}
              handleClick={() => handleClick("Defaultscreen")}
            />
          ) : (
            <Button
              tooltip={"Fullscreen"}
              icon={expand}
              handleClick={() => handleClick("Fullscreen")}
            />
          )}
        </Action>
      </Actions>
    </ControlsContainer>
  );
};

export default Controls;
