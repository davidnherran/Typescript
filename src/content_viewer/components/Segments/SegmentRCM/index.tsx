import React, { useState, useEffect } from "react";
import RcmViewer from "../../../../rcm_viewer/index.js";
import { dbservice, rcmProcess } from "../../../services/api-akeportal";
import { user } from "../../../services/cookies";
import { LayoutRCM } from "./SegmentRCM.styles";
import { useControls } from "../../../context/ControlsContext";

const SegmentRCM = ({ src, parentWidth }) : JSX.Element => {
  const { isFullscreen } = useControls();
  const [error, setError] = useState(undefined);
  const [content, setContent] = useState("");
  const [contentProcessed, setContentProcessed] = useState("");
  const [dataUser, setDataUser] = useState("");
  const { segmentPosition } = useControls();
  const [parentHeight, setParentHeight] = useState(0);

  const calcularAltura = (ancho) => {
    const aspectRatio = 9 / 16;
    const height = ancho * aspectRatio;
    setParentHeight(Math.floor(height) - 10);
  };

  useEffect(() => {
    calcularAltura(parentWidth);
  }, [parentWidth]);

  useEffect(() => {
    connect();
    return;
  }, []);

  useEffect(() => {
    setContent(src.SEGMENTS[segmentPosition].FILE);
    return () => setContent("");
  }, [src, dataUser, segmentPosition]);

  async function connect() {
    let sqlDataUser = null;
    try {
      sqlDataUser = await dbservice(
        `select FIRST_NAME, LAST_NAME from USER_PROFILE where USER_ID='${5341}'`
      );
      setDataUser(sqlDataUser[0]);
    } catch (error) {
      setError(error.toString());
      console.error(error);
    }
  }

  useEffect(() => {
   
      processContent();
    
    return;
  }, [segmentPosition]);

  if (error) {
    return "Error: " + error;
  }

  async function processContent(): Promise<void> {
    let diccionario: IDiccionarioRCM = {};
    diccionario.USER_ID = 5341;
    diccionario.EDAD = 30;
    diccionario.SEXO = "m";
    diccionario.NOMBRE = dataUser.FIRST_NAME;
    diccionario.INGRESOS = 5000;
    diccionario.EGRESOS = 6000;
    diccionario.CANT_USERS = 1;
    diccionario.CANT_PROPOSALS = 2;
    diccionario.CANT_BARGAIN_CHIPS = 7;
    diccionario.DURATION = 58;
    diccionario.MEAN_CANT_PROPOSALS = 1.5;
    diccionario.MEAN_CANT_USERS = 2.1;
    diccionario.RECONOCIDA = "N";
    diccionario.LUZROJA = "S";
    diccionario.IMPRIME = "N";
    // diccionario.SALUDO = greeting;
    // diccionario.CIUDAD = city;
    // diccionario.PAIS = country;
    // diccionario.MONEDA = currency;
    // diccionario.IP = ip;
    // diccionario.NUBES = `${clouds}%`;
    // diccionario.TEMPERATURA = `${Math.floor(temp)}°C`;
    // diccionario.HUMEDAD = humidity;
    // diccionario.PRESION = pressure;
    // diccionario.ROLE = "USER";

    const rta = await rcmProcess(5341, src.SEGMENTS[segmentPosition]?.FILE, diccionario);
    setContentProcessed(rta.content);
  }

  if (contentProcessed === "") processContent();

    return (
      <div
        style={{maxHeight: parentHeight, padding: "75px 25px", height: parentHeight, overflowY: 'scroll', backgroundColor: 'white'}}
      >
        {src.SEGMENTS.map((x, index) => (
          <div key={index} >
            {x.SEGMENT_TYPE === "RCM" && index === segmentPosition && (
              <RcmViewer
                content={contentProcessed}
                processContentCallback={processContent}
                height={parentHeight}
              />
            )}
          </div>
        ))}
        {/* {src.SEGMENT.map((segment, index) => {
          <LayoutRCM parentHeight={parentHeight}>
          <span>{segment.SEGMENT_TYPE}</span>
          {segment.SEGMENT_TYPE === "RCM" && index === segmentPosition && (
          <RcmViewer
            content={contentProcessed}
            processContentCallback={processContent}
          />
        )}
        </LayoutRCM>
      })} 
      */}
      </div>
    );
 
  
};

export default SegmentRCM;
