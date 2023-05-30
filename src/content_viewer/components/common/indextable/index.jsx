import React from "react";
import { useControls } from "../../../context/ControlsContext";
import { useContent } from "../../../context/ContentContext";
import { videosegment } from "../../../assets/icons/index";
import "./indextable.css";

const IndexTable = ({ width }) => {
  const menuHeight = width / 2 / 1.2;
  const marginTop = menuHeight * 0.16 + 100;
  const marginLeft = width / 2 + 50;

  const { showIndextable, setSegmentPosition } = useControls();
  const { content } = useContent();

  if (!showIndextable) return null;

  const setSegment = (index) => {
    setSegmentPosition(index);
  };

  return (
    <div
      className="cw_indextable"
      style={{
        marginTop: `${marginTop}px`,
        marginLeft: `${marginLeft}px`,
      }}
    >
      {content.SEGMENTS.map((segment, index) => (
        <div
          key={index}
          className="cw_indextable__segment"
          onClick={() => setSegment(index)}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={videosegment} />
          </div>
          <div style={{ width: "260px", height: "80px" }}>
            <div
              style={{
                boxSizing: "border-box",
                color: "white",
                padding: "12px 16px 5px",
              }}
            >
              <h3 style={{ margin: 0, padding: 0, fontSize: "16px" }}>
                {segment.NAME}
              </h3>
            </div>
            <div
              style={{
                boxSizing: "border-box",
                color: "white",
                padding: "5px 12px 16px",
              }}
            >
              <p style={{ margin: 0, padding: 0 }}>{segment.type}</p>
            </div>
          </div>
          <div style={{ width: "80px", height: "80px" }}>
            <img
              src={
                segment.THUMBNAIL ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfi2ZcLLTXUMmnG4783_cXq_CtEA_Vh7p8_NEWT6mmusHX9JCqiHLR8BtY1WQHiheT6bc&usqp=CAU"
              }
              height="80"
              width="80"
              style={{ borderRadius: "0px 12px 12px 0px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndexTable;
