import React, { useState, useEffect } from "react";
import { dbservice, rcmProcess } from "./api-akeportal";
// import { useAuth } from "../../components/Context/auth";

import RcmEditor from "../rcm_editor/index.js";
import RcmViewer from "../rcm_viewer/index.js";

 import "./index.css";

function TestRcm(props) {
  // const { user } = useAuth();
  const user = {
    EMAIL: "danino@akelab.org",
    ID: 5341,
    LANG: "en",
    LOCATION_PICTURE:
      "https://wisengine-nbd-devs.s3.amazonaws.com/users/0402068e0db6a83a943915e522aa26ae71ab63b9-5341.jpg",
    LOGIN: "danino",
    ROLE: "Student",
    SESSION_TOKEN: "8bb286b4e65577220dba0fd7892359685582de4d",
    WELCOME: "N",
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [content, setContent] = useState(
    '<p>[SQL-select l.CODE as LANG_CODE from USER_PREFERENCE u inner join LANGUAGE l on u.LANG_ID = l.id where u.USER_ID = {USER_ID}]</p><h1>prueba...</h1><p>{IN-CelEdit}<p/><p>{AN-1001}</p><p>{DT-1601}</p><p>{WL-1464}</p><img src="https://wisengine-nbd.s3.amazonaws.com/estrellas+1.png" >'
  );
  const [contentProcessed, setContentProcessed] = useState("");
  const [dataUser, setDataUser] = useState("");

  useEffect(() => {
    connect();
    setLoading(false);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function connect() {
    let sqlDataUser = null;
    try {
      sqlDataUser = await dbservice(
        `select FIRST_NAME, LAST_NAME from USER_PROFILE where USER_ID='${user.ID}'`
      );
      setDataUser(sqlDataUser[0]);
    } catch (error) {
      setError(error.toString());
      console.error(error);
    }
    setLoading(false);
  }

  async function processContent() {
    let diccionario = {};
    diccionario.USER_ID = user.ID;
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

    const rta = await rcmProcess(user.ID, content, diccionario);
    setContentProcessed(rta.content);
  }

  const varValues = ["{NOMBRE}", "{INGRESOS}", "{EDAD}"];
  const anValues = ["{AN-1001}", "{AN-1002}"];
  const anLabels = ["Predición Acuerdo", "Predición Acuerdo DL"];
  const dtValues = ["{DT-1601}"];
  const dtLabels = ["Prueba"];

  return (
    <React.Fragment>
      <div className="test_rtf_layout">
        <RcmEditor
          content={content}
          updateContent={setContent}
          varTitle={"Variables"}
          anTitle={"Analíticas"}
          dtTitle={"Tabla Decisión"}
          varValues={varValues}
          anValues={anValues}
          anLabels={anLabels}
          dtValues={dtValues}
          dtLabels={dtLabels}
        />
        <div className="test_rtf_buttons">
          <button onClick={() => alert(content)}>Guardar</button>
          <button onClick={processContent}>Procesar</button>
        </div>
        <div id="divRcm" className="test_rtf_layout2">
          <RcmViewer
            content={contentProcessed}
            processContentCallback={processContent}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TestRcm;
