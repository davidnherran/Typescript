import React from "react";
import { useHistory } from "react-router-dom";

// import Error from "../../components/Error";
import { openWiselink } from "./automata.js"

import "./index.css";

function Wiselink({dispatch, wiseLinkId, buttonText, buttonUrl, board, resource, filter, id_negotiation}) {

	const history = useHistory();

	function handleWiseLink(wiseLinkId) {
		dispatch({
			type: 'SET_FLAG_CONTROL_MODAL_EDICION',
			payload: true
		});
		openWiselink(dispatch, wiseLinkId, 'journey', history);
    dispatch({
			type: 'SET_INITIAL_POSITION_WISELINK',
			payload:{board, resource, filter, id_negotiation}
		});
		setTimeout(() => {
			dispatch({
				type: 'SET_FLAG_CONTROL_MODAL_EDICION',
				payload: false
			});
		}, 1000);
	};

  return (
					<div id="parent" className=''>
              {buttonUrl !== '' && <img src={buttonUrl} style={{ cursor: 'pointer'}} alt={""}
                  onClick={() => { handleWiseLink(wiseLinkId) }}/> }
              {buttonUrl === '' && <button
								className="Wiselink__button primary"
								onClick={()=>{handleWiseLink(wiseLinkId)}} >
								{ buttonText  }
                </button>
              }
					</div>
  );
}



export default Wiselink;
