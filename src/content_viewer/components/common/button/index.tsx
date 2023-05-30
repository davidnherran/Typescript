import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { useControls } from "../../../context/ControlsContext";
import { ButtonProps } from "./types";
import { Volume } from "./button.style";

const Button = ({ icon, handleClick, tooltip, onMouseOver, style }: ButtonProps): JSX.Element => {
  const [volumen, setVolumen] = useState(99);
  const { videoPlayer, hoverVolume } = useControls();

  useEffect(() => {
    if (videoPlayer) {
      setVolumen(videoPlayer.volume * 100);
    }
    return () => {
      setVolumen(99);
    };
  }, []);

  const changeVolumer = (video: { volume: number }) => {
    if (video) {
      video.volume = volumen / 100;
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumen(Number(e.target.value));
    changeVolumer(videoPlayer);
  };

  return (
    <div>
      <ReactTooltip />
      <div className="cw button" onClick={handleClick} id={tooltip} style={style}>
        <img
          src={icon}
          alt="icon"
          data-tip={tooltip}
          data-place="top"
          data-effect="solid"
          onMouseOver={onMouseOver}
        />
        {tooltip === "Volume" && hoverVolume && (
          <Volume type="range" onChange={changeVolume} value={volumen} />
        )}
      </div>
    </div>
  );
};

export default Button;
