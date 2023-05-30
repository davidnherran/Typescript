import React from "react";
import { useControls } from "../../../context/ControlsContext";
import { useContent } from "../../../context/ContentContext";
import { videosegment } from "../../../assets/icons/index";
import "./configure.css";

const ConfigTable = ({ width, data }) => {
  const menuHeight = width / 2 / 1.2;
  const marginTop = menuHeight * 0.16 + 100;
  const marginLeft = width / 2 + 50;

  const { configureControl, setSegmentPosition } = useControls();
  const { content, setLevelContent, levelContent } = useContent();

  if (!configureControl) return null;

  const setSegment = (index) => {
    setSegmentPosition(index);
  };

  const level = new Set(data[0].segments.map((segment) => segment.level));
  let result = [...level];

  const options = result.filter(
    (item) => item !== undefined && item !== null && item !== ""
  );

  // split options for "," 
  const splitOptions = options.map((option) => option.split(","));
  const flattenOptions = splitOptions.flat();

  // remove spaces from flattenOptions
  const removeSpaces = flattenOptions.map((option) => option.trim());
 
  // remove duplicates from removeSpaces
  const removeDuplicates = removeSpaces.filter(
    (item, index) => removeSpaces.indexOf(item) === index
  );



  return (
    <div
      className="cw_conf_configure"
      style={{
        marginTop: `${marginTop}px`,
        marginLeft: `${marginLeft}px`,
        zIndex: 99999,
      }}
    >
      {removeDuplicates.map((segment, index) => (
        <div
          key={index}
          className="cw_conf_configure__segment"
          style={{ color: "white" }}
          onClick={() => {setLevelContent(segment); setSegmentPosition(0)}}
        >
          {segment}
        </div>
      ))}
    </div>
  );
};

export default ConfigTable;
