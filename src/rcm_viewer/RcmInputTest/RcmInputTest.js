import React, { useState, useEffect } from "react";
import { useContent } from "../../content_manager/context/ContentContext";
import { dbservice } from "../../test_rcm/api-akeportal"


import "./index.css";

function CelEdit({processContentCallback}) {

  const { userContext } = useContent();
  // const [error, setError] = useState(undefined);
  const [cel, setCel] = useState('');

  

  useEffect(() => {
		    connect();
		    return;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  async function connect() {
    let sqlDataUser = null;
    try {
        sqlDataUser = await dbservice(`select FIRST_NAME, LAST_NAME, CELLPHONE from USER_PROFILE where USER_ID='${userContext.ID}'`);
        setCel(sqlDataUser[0].CELLPHONE);

    } catch (error) {
        // setError(error.toString());
        console.error(error);
    }
  }

  async function handleSave() {
      try {
          await dbservice(`update USER_PROFILE set CELLPHONE = ${cel} where USER_ID='${userContext.ID}'`);
          processContentCallback();
      } catch (error) {
          // setError(error.toString());
          console.error(error);
      }
  }

  function changeCel(event) {
		  setCel(event.target.value);
	}

  return (
    <React.Fragment>
			<div className="principal_rtf" >
        <label>
          Celular:
          <input type="text" value={cel} onChange={changeCel} />
        </label>
				<button onClick={handleSave}>Guardar</button>
			</div>
		</React.Fragment>
  );
}

export default CelEdit;
