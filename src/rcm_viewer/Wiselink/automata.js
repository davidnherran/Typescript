/*
* AUTOMATA versión 0.0.4 - 20/8/2020.
*
* IMPORTANTE: cada función que se cree dentro del automata, y necesite conectarse al store, debe importarto internamente.
* El automata se define como robot inteligente de la plataforma (sin especificar NbD como tal), que le permite ejecutar diferentes funcionalidades y/o rutinas, como un alexa. Le permite controlar los botones, conexiones, permisos y accesos, y todo lo relacionado con el contenido y navegación de un usuario dentro de la plataforma.
* La rutina esta definida como una serie de funcionalidades o ejecuciones que se deben realizar de acuerdo a un comando/click/evento u otro disparador dentro o fuera de la plataforma.
* El objetivo principal de estas rutinas es adecuar el tablero, o en general la plataforma, para llevar a un usuario a un punto especifico con un fin especifico, ejecutar/aplicar un conocimiento nuevo.
* El automata en su definición más sensilla, permite dispara wiselinks.
*
* Por favor dejar documentada cada actualización o funcionalidad nueva del automata, modificando la versión y la fecha.
*
*
*/
//import configureStore from './redux/store/Store';
import { dbservice, rcmProcess } from "../../test_rcm/api-akeportal";

export async function updateBoard(dispatch, type, selection) {

	if ('serviceWorker' in navigator) {
		const reg = await navigator.serviceWorker.getRegistration();
		if (reg) {
			reg.update();
		}
	}

  handleUserTools(dispatch);

	dispatch({
		type: 'SET_ASSISTANT',
		payload: false
	});

	if (type === 'theory') {
		dispatch({
			type: 'SET_BOARD',
			payload: 'theory'
		});

		dispatch({
			type: 'SET_VISUALIZE',
			payload: false
		});
		dispatch({
			type: 'SET_USER_ROLE',
			payload: undefined
		});
		// apagar la selección posible de caso o negociación
		// dispatch({
		// 	type: 'SET_OFF_CASES'
		// });
		dispatch({
			type: 'SET_OFF_NEGOTIATIONS'
		});
	};

	if (type === 'cases' || type === 'negotiations') {

		let negotiationSelected = selection;

		if (type === 'cases') {
			dispatch({
				type: 'SET_BOARD',
				payload: 'case'
			});
			// Se comenta ya que la variable es requerida para los elementos creados 
			/* dispatch({
				type: 'SET_NODES_USERSINFO',
				payload: []
			}); */

		} else if (type === 'negotiations') {
			dispatch({
				type: 'SET_BOARD',
				payload: 'negotiations'
			});
			// Se comenta ya que la variable es requerida para los elementos creados 
			/* dispatch({
				type: 'SET_NODES_USERSINFO',
				payload: []
			}); */
		}

		dispatch({
			type: 'SET_VISUALIZE',
			payload: true
		});

		dispatch({
			type: 'SET_RESOURCE',
			payload: 'process'
		});

		dispatch({
			type: 'SET_NEGOTIATION_TITLE',
			payload: negotiationSelected.NAME
		});

		dispatch({
			type: 'SET_NEGOTIATION_ID',
			payload: negotiationSelected.ID
		});

		dispatch({
			type: 'SET_NEGOTIATION_STATE',
			payload: negotiationSelected.NEGOTIATION_STATE
		});

		dispatch({
			type: 'SET_CANVAS_VERSION',
			payload: negotiationSelected.CANVAS_VERSION
		});

		dispatch({
			type: 'SET_NEGOTIATION_CASE',
			payload: negotiationSelected.CASE_TYPE_ID
		});

		dispatch({
			type: 'SET_NEGOTIATION_VERSION',
			payload: negotiationSelected.CASE_VERSION_ID
		});

		dispatch({
			type: 'SET_USER_ROLE',
			payload: parseInt(negotiationSelected.NEGOTIATION_ROLE)
		});

		// Función en desarrollo: colocar el estado del canvas de acuerdo al estado del caso:
		let setStateBoard = 'edit'
		if (negotiationSelected.NEGOTIATION_STATE === 'ENABLED') {
			setStateBoard = 'edit'
		}
		else {
			setStateBoard = 'read'
		}

		dispatch({
			type: 'SET_NODES_STATE_BOARD',
			payload: setStateBoard
		});

	}
};

// °Wiselink versión 0.0.2 - 20/08/2020.
export function wiselink(dispatch, origin, element, etiqueta) {
	//let state = configureStore().getState();

	// detectar el lugar de origen del wiselink para verificar que acción de cierre o navegación ejecutar:
	let next = state.sidebar.next;

	if (origin === 'notification' || origin === 'chat-sidebar' || origin === 'planner-sidebar') {
		dispatch({
			type: "SET_PREV_NAV",
			payload: next,
		});

		dispatch({
			type: "SET_NEXT_NAV",
			payload: null,
		});
	};

	// Adecuación del tablero principal, si así lo requiere el wiselink ejecutado:
	// Se realiza a un llamado de una función interna del automata, que se utiliza también en otras areas de la plataforma como la selección manual del usuario sobre el mismo tablero.
	// Esta función requiere recibir el parametro heredado de dispatch para ejecutar los cambios requeridos:

	if (element.BOARD === 'theory') {
		let journey_content = state.journey.data_content;
		let journey_element = journey_content.filter(item => item.ID === element.JOURNEY_ELEMENT_CONTENT_ID)[0];

		let filter = state.canvas.filter;

		updateBoard(dispatch, 'theory');

		// contenido de tipo survey
		if (journey_element.ELEMENT_CONTENT_TYPE_ID === 158) {
			dispatch({
				type: 'SET_MODAL_SURVEY',
				payload: true
			});
			dispatch({
				type: 'SET_SURVEY_SELECTED',
				payload: journey_element.CONTENT_ID
			});
		};

		// contenido de tipo conceptual // generalidades del journey // guias e intrucciones.
		if (journey_element.ELEMENT_CONTENT_TYPE_ID === 159 || journey_element.ELEMENT_CONTENT_TYPE_ID === 164 || journey_element.ELEMENT_CONTENT_TYPE_ID === 165 || journey_element.ELEMENT_CONTENT_TYPE_ID === 171 ) {
			let id = journey_element.CONTENT_ID;

			dispatch({
				type: 'SET_FILTER',
				payload: {...filter, journey: id}
			});

			// contenido cableado para salida a producción
			dispatch({
				type: 'SET_USER_ROLE',
				payload: undefined
			});

			dispatch({
				type: 'SET_NEGOTIATION_VERSION',
				payload: null
			});
		};
	};



	if (element.BOARD === 'cases') {

		let data_negotiation = state.negotiation.data_negotiations;
		let negotiationSelected = data_negotiation.filter(item => item.ENVIRONMENT === 'case' && item.CASE_VERSION_ID === element.CASE_VERSION_ID)[0];

		updateBoard(dispatch, 'cases', negotiationSelected);
	};

	// falta desarrollar toda la funcionalidad para disparar el acceso a un caso:
	// * Toca conectarse a la información de la negociación
	// ** Toca trabajar en el reducer para la información del usuario respecto a un caso de negociación o a una negociación real: Rol, tipo de actor, alcance del usuario (administrador, creador/organización, etc.)
	// *** toca trabajar en el modelo de datos que permita una construcción de wiselinks mucho mas elaborados y comenzar a trabajar en la estructuración de la tabla de wiselinks:
	// **** Actualizar base de datos de canvas_component y canvas_content para nutrir la base de datos de desarrollo con mas ejemplos y más información para consultar desde el manejo de las notificaciones::

	//history.push(element.REDIRECT);
	//
};

// función para actualizar el estado de los botones del tablero inteligente.
export function buttonStatus(dispatch, etiqueta ) {
	let state = configureStore().getState();

	// conectarse al ambiente actual del tablero para saber que botones habilitar o deshabilitar en termino de acceso.
	// Esta funcionalidad es diferente disponer o activar un botón.
	// esto va directamente relacionado con habilitar o deshabiltiar un botón según navegacion del usuario.
	let resource = state.canvas.resource;
	let id_negotiation = state.negotiation.id_negotiation;
	let filter = state.canvas.filter;
	let board = state.canvas.board;
	let button_status = state.navigation.button_status;
	let button_assistant = state.canvas.assistant;


	if (board === 'theory') {
		dispatch({
			type: 'SET_NAVIGATION_BUTTON_STATUS',
			payload: {
				...button_status,
				NOTES: false,
				SUGGESTIONS: false,
				ASSISTANT: true,
				COMBINE: true,
				COMPARE: true,
				PDF: true
			}
		});
	}

	if (board === 'case' || board === 'negotiations') {
		let setCompare;
		// validar el componente del canvas de navegación
		// los componentes 7, 9, 10 y 11, a la fecha no tienen esta funcionalidad desarrollada.
		if (resource !== 'canvas') {
			setCompare = true;
		}
		else if ((filter.canvas >= 9 && filter.canvas <= 11) || filter.canvas === 7) {
			setCompare = true;
		}
		else {
			setCompare = false;
		}

		if ((resource === 'canvas' && button_assistant) || (resource === 'process') || (resource === 'journey') || (resource === 'actor')) {
			dispatch({
				type: 'SET_NAVIGATION_BUTTON_STATUS',
				payload: {
					...button_status,
					NOTES: false,
					SUGGESTIONS: false,
					ASSISTANT: false,
					COMBINE: false,
					COMPARE: setCompare,
					PDF: true
				}
			});
		} else {

			dispatch({
				type: 'SET_NAVIGATION_BUTTON_STATUS',
				payload: {
					...button_status,
					NOTES: true,
					SUGGESTIONS: true,
					ASSISTANT: false,
					COMBINE: false,
					COMPARE: setCompare,
					PDF: false
				}
			});
			dispatch({
				type: 'SET_NOTES',
				payload: false
			});
			dispatch({
				type: 'SET_SUGGESTION',
				payload: false
			});
			dispatch({
				type: 'SET_ASSISTANT',
				payload: false
			});
		}
	};

	// NOTES SUGGESTION
	if (resource === 'journey') {
		dispatch({
			type: 'SET_NOTES',
			payload: false
		});
		dispatch({
			type: 'SET_SUGGESTION',
			payload: false
		});
		dispatch({
			type: 'SET_ASSISTANT',
			payload: false
		});
	}

	// COMBINE COMPARE
	if (!id_negotiation || resource !== 'canvas' || (filter.canvas >= 9 && filter.canvas <= 11) || filter.canvas === 7) {
		dispatch({
			type: 'SET_COMBINE',
			payload: false
		});
		dispatch({
			type: 'SET_CANVAS_COMPARE',
			payload: false
		});
	}
};


/*
	Nueva función para la definición de wiselinks abiertos:
	Esta estructura debe conectarse con la base de datos, traer la información correspondiente, construir el ambiente y ejecutar.
	* Llamado de la función: cuando el componente JourneyContent detecta que es un wiselink, llama esta función:
	* Parametros: función dispatch, codigo del elemento del journey seleccionado ...
	Proceso:
	* Consultar el wiselinks correspondiente
	* Validar el tipo de wiselink para consultas posteriores
	* Configurar el entorno de acuerdo a los parametros del wiselink
	* Ejecutar ambiente y ejecutar wiselink
	*
	* ETIQUETA: La etiqueta es un parametro que me permite saber que elemento (id) es llamado, en principio, desde el journey.
	*
*/
export async function openWiselink(dispatch, wiselinkId, origin, history, etiqueta ) {

	let state = configureStore().getState();
	let next = state.sidebar.next;
	let journeyElementContent = undefined;


	// Modulo sidebar:
	// detectar el lugar de origen del wiselink para verificar que acción de cierre o navegación ejecutar:
	if (origin === 'notification' || origin === 'chat-sidebar' || origin === 'planner-sidebar') {
		dispatch({
			type: "SET_PREV_NAV",
			payload: next,
		});

		dispatch({
			type: "SET_NEXT_NAV",
			payload: null,
		});
	};


	// Inicia la ejecución de comunicación con la base de datos:
	// Activa el modo de carga como UX
	dispatch({
		type: 'SET_LOADING',
		payload: true
	});

	// consulta inicial de la estructura y contenido del wiselink:
	let sqlWiselink = await dbservice(`select ID, ELEMENT_PAGE_ID, BOARD_TYPE_ID, NAVIGATION_TYPE_ID, CANVAS_COMPONENT_ID, CASE_ID, NEGOTIATION_ID, JOURNEY_ELEMENT_CONTENT_ID, PARAMETERS, TYPE, ACTIVE, SLIDE from WISELINK where ID = ${wiselinkId} and ACTIVE='Y'`);

	let wiselink = sqlWiselink[0];

	dispatch({
		type: 'SET_WL_WISELINK',
		payload: wiselink
	});

	/*
	*
	* PÁGINA O ELMENTO DEL SIDEBAR:
	* El primer elemento de ejecución de un wiselink es el redireccionamiento a una vista o a un elemento del sidebar.
	* La definición de la columna ELEMENT_PAGE_ID no indica se debe ejecutar la navegación por react router, o si debe expander un elemento del sidebar menu.
	* 10: pagina principal - tablero
	* 20: pagina edición del perfil
	* 30: sidebar menu notificaciones
	* 40: sidebar menu chat
	* 50: sidebar menu planner
	* 60: pagina planner expandido
	* Estos elenentos pueden ser variables por base de datos según el proyecto.
	* Es importante actaulizar el modelo, para que mediante un join, se elimine esta validación por id, y el mismo perfil en la base de datos asigne si es tipo pagina o sidebar, y a su vez la ruta a la que debe navegar mediante react router. Con esta actualización el modelo solo debe ejecutar dos validaciones: si es tipo main o si es tipo sidebar.
	*
	*/

	if (wiselink.ELEMENT_PAGE_ID === 10) {
		history.push("/canvas");
	} else if(wiselink.ELEMENT_PAGE_ID === 20) {
		history.push("/account/profile");
	} else if(wiselink.ELEMENT_PAGE_ID === 30) {
		dispatch({
			type: "SET_PREV_NAV",
			payload: next,
		});

		dispatch({
			type: "SET_NEXT_NAV",
			payload: 'notification',
		});
	} else if(wiselink.ELEMENT_PAGE_ID === 40) {
		dispatch({
			type: "SET_PREV_NAV",
			payload: next,
		});

		dispatch({
			type: "SET_NEXT_NAV",
			payload: 'chat',
		});
	} else if(wiselink.ELEMENT_PAGE_ID === 50) {
		dispatch({
			type: "SET_PREV_NAV",
			payload: next,
		});

		dispatch({
			type: "SET_NEXT_NAV",
			payload: 'calendar',
		});
	} else if(wiselink.ELEMENT_PAGE_ID === 60) {
		history.push("/calendar");
	};

	/*
	*
	* La dinición de un wiselink, en la mayoria de las veces, puede tener atado un elemento del journey mediante la columna JOURNEY_ELEMENT_CONTENT_ID.
	*	Sí esta variable es diferente de null, es porque esta relacionada con un elemento del journey.
	* La asignación de que elemento es, se realiza filtrando el contenido del journey que se encuentra en el reducer journey_content.
	* La asignación de este elemento, permite conocer el perfil de este contenido: contenido conceptual, link externo, survey, juego, etc.
	*
	* Otro escenario posible, es un wiselinks reutilizado por diferentes talleres que no necesariamente tiene la columna JOURNEY_ELEMENT_CONTENT_ID, pero si pertenece a un elemento del joureny
	* Toca buscar si existe este wiselink, atado a algun elemento del journey.
	*
	*/


	if (wiselink.JOURNEY_ELEMENT_CONTENT_ID !== null ) {

		let journey_content = Array.from(state.journey.data_content);
		journeyElementContent = journey_content.filter(item => item.ID === wiselink.JOURNEY_ELEMENT_CONTENT_ID)[0];

	}
	else {

		let journey_content = Array.from(state.journey.data_content);
		let filtro_journey_content = journey_content.filter(item => item.WISELINK_ID === wiselinkId);


		if (filtro_journey_content.length > 0) {
			journeyElementContent = filtro_journey_content[0];
		}

	};

	/*
	*
	* TIPO DE TABLERO:
	*
	*/

	// detectar las variables que debe setear como la vista a donde navegar, tipo de tablero, recurso y contenido si requiere:
	// Tipo de tablero:
	if (wiselink.BOARD_TYPE_ID === 10) {

		let filter = state.canvas.filter;

		updateBoard(dispatch, 'theory');


		if (journeyElementContent !== undefined) {
			let selected = state.journey.selected;


			dispatch({
				type: "SET_ID_JOURNEY_SELECTED",
				payload: journeyElementContent.ID,
			});

			if (journeyElementContent.ELEMENT_CONTENT_TYPE_ID !== 158) {
				dispatch({
					type: "SET_DATA_JOURNEY_SELECTED",
					payload: journeyElementContent,
				});
			}

			dispatch({
				type: 'SET_JOURNEY_SELECTED',
				payload: !selected
			});

			if (journeyElementContent.ELEMENT_CONTENT_TYPE_ID !== 169 && journeyElementContent.ELEMENT_CONTENT_TYPE_ID !== 158) {
				dispatch({
		     		 type: 'SET_PRESENTATION_VIEWER_OPEN',
					payload: false,
		    });
			};

			// contenido de tipo survey
			if (journeyElementContent.ELEMENT_CONTENT_TYPE_ID === 158) {


				let sqlSurveyType = await dbservice(`select SURVEY_TYPE_ID from SURVEY where ID = ${journeyElementContent.CONTENT_ID} and ACTIVE = 'Y'`);
				dispatch({
					type: 'SET_SURVEY_TYPE',
					payload: sqlSurveyType[0].SURVEY_TYPE_ID
				});
				dispatch({
					type: 'SET_SURVEY_SELECTED',
					payload: journeyElementContent.CONTENT_ID
				});
				dispatch({
					type: 'SET_MODAL_SURVEY',
					payload: true
				});

			};

			// contenido de tipo conceptual // generalidades del journey // guias e intrucciones.
			if (journeyElementContent.ELEMENT_CONTENT_TYPE_ID === 159 || journeyElementContent.ELEMENT_CONTENT_TYPE_ID === 164 || journeyElementContent.ELEMENT_CONTENT_TYPE_ID === 165 || journeyElementContent.ELEMENT_CONTENT_TYPE_ID === 171 ) {


				let id = journeyElementContent.CONTENT_ID;
				dispatch({
					type: 'SET_FILTER',
					payload: {...filter, journey: id}
				});

				// contenido cableado para salida a producción
				dispatch({
					type: 'SET_USER_ROLE',
					payload: undefined
				});

				dispatch({
					type: 'SET_NEGOTIATION_VERSION',
					payload: null
				});
			};

			if (journeyElementContent.ELEMENT_CONTENT_TYPE_ID === 169) {

				dispatch({
					type: 'SET_PRESENTATION_ID',
					payload: journeyElementContent.CONTENT_ID,
				});

				dispatch({
					type: 'SET_PRESENTATION_HINDEX',
					payload: wiselink.SLIDE,
				});

				dispatch({
					type: 'SET_PRESENTATION_VIEWER_OPEN',
					payload: true,
				});

			};
		};

	} else if (wiselink.BOARD_TYPE_ID === 20) {
		// Necesito poder filtar el caso para enviar la selección:
		let data_negotiation = state.negotiation.data_negotiations;

		let negotiationSelected = data_negotiation.filter(item => item.ENVIRONMENT === 'case' && item.CASE_VERSION_ID === wiselink.CASE_ID);

		if (negotiationSelected.length > 0) {
			updateBoard(dispatch, 'cases', negotiationSelected[0]);
		}

	} else if (wiselink.BOARD_TYPE_ID === 30) {

		// modulo de navegación y selección de negociación en desarrollo...
		let data_negotiation = state.negotiation.data_negotiations;
		let negotiationSelected = data_negotiation.filter(item => item.ENVIRONMENT === 'negotiation' && item.ID === wiselink.NEGOTIATION_ID);

		if (negotiationSelected.length > 0 && state.negotiation.id_negotiation !== negotiationSelected[0].ID) {
			updateBoard(dispatch, 'negotiations', negotiationSelected[0]);
		}

	};

	/*
	*
	* NAVIGATOR'S BOARD:
	*
	*/

	// Tipo de navegación cuando aplique
	// Actualizar el navigators board según la indicación del wiselink.
	if (wiselink.NAVIGATION_TYPE_ID === 10) {
		dispatch({
			type: 'SET_RESOURCE',
			payload: 'process'
		});
	} else if (wiselink.NAVIGATION_TYPE_ID === 20) {
		dispatch({
			type: 'SET_RESOURCE',
			payload: 'canvas'
		});
	} else if (wiselink.NAVIGATION_TYPE_ID === 30) {
		dispatch({
			type: 'SET_RESOURCE',
			payload: 'actors'
		});
	} else if (wiselink.NAVIGATION_TYPE_ID === 40) {
		dispatch({
			type: 'SET_RESOURCE',
			payload: 'journey'
		});
	}
	
	let filter = state.canvas.filter;

	if(wiselink.CANVAS_COMPONENT_ID === 1){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 2){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 3){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 4){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 5){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 6){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 7){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(Number(wiselink.CANVAS_COMPONENT_ID.toFixed(1)) === 7.1){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: 7.1 },
		})
	}else if(Number(wiselink.CANVAS_COMPONENT_ID.toFixed(1)) === 7.2){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, ['canvas']: 7.2 },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 9){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 10){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 11){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, canvas: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 24){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, process: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 25){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, process: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 26){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, process: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 27){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, process: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 28){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, process: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 29){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, process: wiselink.CANVAS_COMPONENT_ID },
		})
	}else if(wiselink.CANVAS_COMPONENT_ID === 30){
		dispatch({
			type: 'SET_FILTER',
			payload: { ...filter, process: wiselink.CANVAS_COMPONENT_ID },
		})
	}else


	/*
	*
	* PARAMETROS DEL WISELINK.
	* Los parametros del wiselink, es la estructura que permite contolrar el paso a paso del usuario a traves de un wiselink abierto.
	* Este puede ser ejecutado desde un elemento perteneciente a un journey o un elemento fuera de un journey, como un recortadorio, o tarea asignada por el profesor de forma individual.
	* Se consultan los parametros y se inicia el estado en la plataforma de wiselink abierto.
	* Luego se ejecuta la función de next step para que inicie el recorrido del wiselink abierto.
	* Sí el wiselink tiene un elemento del journey atado, este lo asignara a la variable finish, que va permitir colocar como finalizado un elemento del journey de tipo wiselink.
	*
	*/

	if (wiselink.TYPE === 'open' && wiselink.PARAMETERS === 1) {
		// debe ejecutar el modo de wiselink abierto, y adecuar todo el tablero según sus parametros:


		// VALIDAR si la condición del estado del journeyElementContent se rompe cuando el elemento es undefined.
		// por ahora todos los wiselinks con parametros se asumen que son disparados desde el JOURNEY.
		if ((journeyElementContent !== undefined && journeyElementContent.STATE === 'ENABLED') || journeyElementContent === undefined) {

			let sqlParameters = await dbservice(`select * from WISELINK_PARAMETERS where WISELINK_ID = ${wiselinkId} and ACTIVE='Y' order by ORDEN`);


			dispatch({
				type: 'SET_WL_OPEN',
				payload: true
			});

			dispatch({
				type: 'SET_WL_PARAMETERS',
				payload: sqlParameters
			});

			dispatch({
				type: 'SET_WL_STEP',
				payload: 0
			});

			let setFinish;

			if (journeyElementContent !== undefined) {
				setFinish = journeyElementContent.ID;
			}
			else {
				setFinish = null;
			}

			dispatch({
				type: 'SET_WL_FINISH',
				payload: setFinish
			});

			nextStep(dispatch);

		}

	} else {

		dispatch({
			type: 'RESET_WISELINK_REDUCER'
		});

	}

	// finalización de ejecución de un wiselink:
	dispatch({
		type: 'SET_LOADING',
		payload: false
	});

};

export async function nextStep (dispatch) {
	let state = configureStore().getState();
	let parameters = state.wiselink.parameters;
	let step = state.wiselink.step;
	let newStep = state.wiselink.step + 1;
	let finish = state.wiselink.finish;


	if (step < parameters.length) {
		let disabled = parameters.filter(item => item.ORDEN === newStep)[0];

		dispatch({
			type: 'SET_WL_DISABLED',
			payload: disabled
		});

		dispatch({
			type: 'SET_VISUALIZE',
			payload: false
		});

		dispatch({
			type: 'SET_ASSISTANT',
			payload: true
		});

		dispatch({
			type: 'SET_WL_STEP',
			payload: newStep
		});

		let filter = state.canvas.filter;

		dispatch({
			type: 'SET_FILTER',
			payload: {...filter, process: disabled.CANVAS_COMPONENT_ID}
		});
	}
	else {

		if (finish !== null) {
			// Finalizar el elemento
			dispatch({
				type: 'SET_LOADING',
				payload: true
			});

			let user = state.profile.profile;
			let workshopId = state.workshop.workshopId;
			let data_content = state.journey.data_content;

			let selectPrecedence = await dbservice(`select CHILDREN_ELEMENT_ID from PRECEDENCE where PARENT_ELEMENT_ID = ${finish}`);

			await dbservice(`update USER_JOURNEY_CONTENT set STATE='FINALIZED' where USER_ID = ${user.USER_ID} and JOURNEY_ELEMENT_CONTENT_ID = ${finish}`);

			if (selectPrecedence.length > 0) {
				await dbservice(`update USER_JOURNEY_CONTENT set STATE='ENABLED' where JOURNEY_ELEMENT_CONTENT_ID = ${selectPrecedence[0].CHILDREN_ELEMENT_ID} and USER_ID=${user.USER_ID}`);
			}

			// let idsElements = data_journey.map((element) => element.ID);
			//
			//
			// let updateData = await dbservice(
			// 	`select A.ID, A.JOURNEY_ELEMENT_ID, A.ELEMENT_CONTENT_TYPE_ID, A.CONTENT_ID, A.NAME, A.DURATION, B.STATE, A.REDIRECT, A.WISELINK_ID, C.START_DATE, C.END_DATE, A.CASE_TYPE_ID from JOURNEY_ELEMENT_CONTENT A, USER_JOURNEY_CONTENT B, JOURNEY_ELEMENT C where A.ID = B.JOURNEY_ELEMENT_CONTENT_ID and C.ID = A.JOURNEY_ELEMENT_ID and B.USER_ID=${user.USER_ID} and A.JOURNEY_ELEMENT_ID in  (${idsElements}) and A.ACTIVE = 'Y' order by A.ORDEN`
			// );
			//

			let newDataContent = data_content.map(item => {
				if (item.ID === finish) {
					return {
						...item,
						STATE: 'FINALIZED'
					}
				}	else {
					return item
				}
			});


			dispatch({
				type: 'SET_DATA_CONTENT',
				payload: newDataContent
			});


			// Actualización graficas:

			// Peticiones para las gráficas de los journeys
			// let sqlJourneysDashboard = await dbservice(`select A.JOURNEY_ID, A.NAME, A.ORDEN, A.TODOS, A.FINALIZADOS
			// from USER_DASHBOARD_CONTENT A, WORKSHOP_JOURNEY B
			// where A.ID = ${user.USER_ID} and A.JOURNEY_ID = B.ID and B.WORKSHOP_ID = ${workshopId} and B.ACTIVE = 'Y'
			// order by A.ORDEN`);

			// let journeysProgress = [];

			// for (let i = 0; i < sqlJourneysDashboard.length; i++){
			// 		let element = sqlJourneysDashboard[i];
			// 		if (element.FINALIZADOS === null){
			// 				let percentage = 0;
			// 				journeysProgress.push({ ...element, PERCENTAGE: percentage });
			// 		} else {
			// 				let percentage = Math.floor((element.FINALIZADOS * 100) / element.TODOS);
			// 				journeysProgress.push({ ...element, PERCENTAGE: percentage });
			// 		}
			// }

			let sqlJourneysProgress = await dbservice(`select A.JOURNEY_ID, A.NAME, A.ORDEN, A.TODOS, A.FINALIZADOS, case when A.FINALIZADOS is null then 0 else TRUNC(((A.FINALIZADOS * 100)/A.TODOS), 0) end as PERCENTAGE
      from USER_DASHBOARD_CONTENT A, WORKSHOP_JOURNEY B
      where A.ID = ${user.USER_ID} and A.JOURNEY_ID = B.ID and B.WORKSHOP_ID = ${workshopId} and B.ACTIVE = 'Y'
      order by A.ORDEN`)

			let sqlStudentsProgress = await dbservice(`select b.journey_id, e.name, e.orden, count(*) as todos, (select count(*)
				from journey_element_content a1, journey_element b1, user_journey_content c1
				where a1.journey_element_id = b1.id
				and a1.active = 'Y'
				and c1.state = 'FINALIZED'
				and a1.id=c1.journey_element_content_id
				and b.journey_id = b1.journey_id
				group by b1.journey_id
				) as finalizados
				from journey_element_content a, journey_element b, workshop_journey e
				where a.journey_element_id = b.id
				and a.active = 'Y'
				and e.id=b.journey_id
				and e.workshop_id = ${workshopId}
				group by b.journey_id, e.name, e.orden
				order by e.orden`);


			let sqlUsersJourneys = await dbservice(`select count(*) as USERS from USER1 A, WORKSHOP_ACTOR B where B.WORKSHOP_ID = ${workshopId} and A.ID = B.USER_ID and A.ROLE_ID = 4`);

			let totalProgress = [];

			for (let i = 0; i < sqlStudentsProgress.length; i++){
				let element = sqlStudentsProgress[i]
				if(element.FINALIZADOS === null){
					let percentage = 0
					totalProgress.push({...element, TOTALPERCENTAGE: percentage})
				} else {
					let valor = element.FINALIZADOS / parseInt(sqlUsersJourneys[0].USERS)
					let percentage = Math.floor((valor / element.TODOS) * 100)
					totalProgress.push({...element, TOTALPERCENTAGE: percentage})
				}
			}

			//
			// Seteo de la información del progreso de los journeys por usuario
			dispatch({
				type: 'SET_JOURNEYS_PROGRESS',
				payload: sqlJourneysProgress
			});

			// Seteo de la información del progreso general de los estudiantes en los journeys
			dispatch({
				type: 'SET_STUDENTS_PROGRESS',
				payload: totalProgress
			});

			//Fin de la intervención
		};

		//
		dispatch({
			type: 'RESET_WISELINK_REDUCER'
		});

		updateBoard(dispatch, 'theory');
		dispatch({
			type: 'SET_RESOURCE',
			payload: 'journey'
		});

		dispatch({
			type: 'SET_LOADING',
			payload: false
		});
	}

};

/*
* Disparar una ruta de conocimiento:
* Esta funcionalidad permite, mediante un llamado pull o push (notificación, evento, click, sing up, primera vez alguna herramienta)
* Disparar la consulta y ejecución de una ruta de conocimiento.
* Parametros por confirmar:
* @autor Jonathan Vargas
* @params [dispatch, history, origin, route_id]
*/

export async function startKnowledgeRoute(dispatch, history, origin, route_id) {

	let state = configureStore().getState();
	let next = state.sidebar.next;
	let user = state.profile.profile;
	let filter = state.canvas.filter;
	let tutorialData = state.tutorial.tutorialData;
	let routeInit = state.tutorial.routeInit;
	let currentGuide = state.tutorial.currentGuide;
	let positionValue = currentGuide.value;
	// let resource = state.canvas.resource;
	// let processData = state.tutorial.processData;
	// let canvasData = state.tutorial.canvasData;

	// Modulo sidebar:
	// detectar el lugar de origen del wiselink para verificar que acción de cierre o navegación ejecutar:
	if (origin === 'notification' || origin === 'chat-sidebar' || origin === 'planner-sidebar') {
		dispatch({
			type: "SET_PREV_NAV",
			payload: next,
		});

		dispatch({
			type: "SET_NEXT_NAV",
			payload: null,
		});
	};

	// Inicia la ejecución de comunicación con la base de datos:
	// Activa el modo de carga como UX
	dispatch({
		type: 'SET_LOADING',
		payload: true
	});

	const Page = {
		10: {name: 'BOARD', type: 'main', to: '/canvas'},
		20: {name: 'PROFILE', type: 'main', to: '/account/profile'},
		30: {name: 'NOTIFICATIONS', type: 'sidebar', to: 'notification'},
		40: {name: 'CHAT', type: 'sidebar', to: 'chat'},
		50: {name: 'PLANNER', type: 'sidebar', to: 'calendar'},
		60: {name: 'PLANNER', type: 'main', to: '/calendar'},
	};

	const Board = {
		10:	'theory',
		20:	'case',
		30:	'negotiations',
		99:	'n/a',
	};

	const Navigation = {
		10: {name: 'PROCESS', to: 'process'},
		20: {name: 'CANVAS', to: 'canvas'},
		30: {name: 'ACTORS', to: 'actors'},
		40: {name: 'JOURNEY', to: 'journey'},
		99: {name: 'n/a', to: ''},
		50: {name: 'DIMENSIONS', to: 'dimensions'},
	};


	if (route_id !== undefined) {
		try {
			// Petición de ruta específica de la plataforma
			let sqlGeneralRoute = await dbservice(`select ID, NAME, TYPE_ROUTE from ROUTE where ID = ${route_id} and ACTIVE = 'Y'`);

			// Petición de las tarjetas pertenecientes a la ruta específica
			let sqlRouteData = await dbservice(`select A.ID, A.ROUTE_ID, A.BUTTON, A.RCM_ID, A.ORDEN, A.TITLE_${user.LANG} as TITLE, A.CONTENT_${user.LANG} as CONTENT, B.TEXT_${user.LANG} as CONTENT_RCM, A.TYPE_CARD, A.ELEMENT_PAGE_ID, A.BOARD_TYPE_ID, A.NAVIGATION_TYPE_ID, A.CASE_TYPE_ID, A.NEGOTIATION_TYPE_ID, A.CANVAS_COMPONENT_ID from ROUTE_DATA A, RCM B where A.RCM_ID = B.ID and A.ROUTE_ID = ${sqlGeneralRoute[0].ID} and A.ACTIVE = 'Y' and B.ACTIVE = 'Y' order by A.ORDEN`);

			// Cambiar el valor inicial de la tarjeta de una ruta al cambiar de ambiente
			// if (resource !== origin) {
			// 	dispatch({
			// 		type: 'SET_CURRENT_GUIDE',
			// 		payload: { ...currentGuide, value: 0 },
			// 	});

			// 	positionValue = 0
			// }

			// let tourData = []
			// let tutorialCards = []

			// if (route_id === 21) {
			// 	tourData = canvasData
			// } else if (route_id === 22) {
			// 	tourData = processData
			// }


			// Se obtiene la tarjeta que tenga la propiedad STATE: 'Completed'
			// Esta tarjeta es la última que el usuario visualizo en una ruta
			// let currentCard = tourData.filter(data => data.STATE === 'Completed')

			// // Si existe una tarjeta, no se modifica ninguna de las tarjetas
			// // Si no existe una tarjeta, se asigna el valor de STATE: 'Completed' a la primera de ellas en una ruta
			// if (currentCard.length > 0) {
			// 	tutorialCards = tourData
			// } else {
			// 	tutorialCards = tourData.map((data, index) => {
			// 		if (index === 0) {
			// 			return { ...data, STATE: 'Completed' }
			// 		} else {
			// 			return data
			// 		}
			// 	})
			// }

			// let cardsOk = tutorialCards.filter(data => data.STATE === 'Completed')

			// let lastCard = cardsOk[cardsOk.length - 1]

			// // Se vuelve a obtener la tarjeta con la propiedad de STATE: 'Completed' y se asigna a la variable que muestra la tarjeta (routeInit)
			// // Se obtiene el indice de esta tarjeta para controlar el botón de seguimiento de las tarjetas
			// // let initialCard = tutorialCards.filter(data => data.STATE === 'Completed')[0]
			// let initialCard = lastCard
			// // let indexCard = tutorialCards.indexOf(tutorialCards.filter(data => data.STATE === 'Completed')[0])
			// let indexCard = tutorialCards.indexOf(initialCard)

			dispatch({
				type: 'SET_CURRENT_GUIDE',
				payload: { ...currentGuide, value: positionValue },
			});

			// dispatch({
			// 	type: 'SET_ROUTE_STATE',
			// 	payload: { ...routeInit, ACTIVE: true, CURRENT: initialCard }
			// });

			// dispatch({
			// 	type: 'SET_TUTORIAL_DATA',
			// 	payload: { ...tutorialData, ID: sqlGeneralRoute[0].ID, NAME: sqlGeneralRoute[0].NAME, TYPE: sqlGeneralRoute[0].TYPE_ROUTE, CARDS: tutorialCards}
			// });

			dispatch({
				type: 'SET_ROUTE_STATE',
				payload: { ...routeInit, ACTIVE: true, CURRENT: sqlRouteData[positionValue] }
			});

			dispatch({
				type: 'SET_TUTORIAL_DATA',
				payload: { ...tutorialData, ID: sqlGeneralRoute[0].ID, NAME: sqlGeneralRoute[0].NAME, TYPE: sqlGeneralRoute[0].TYPE_ROUTE, CARDS: sqlRouteData }
			});

			// Construcción de variables para la navegación donde inicia la ruta:
			let selectComponent = sqlRouteData[positionValue].CANVAS_COMPONENT_ID ? Number((sqlRouteData[positionValue].CANVAS_COMPONENT_ID).toFixed(1)) : null;
			let selectNavigation = sqlRouteData[positionValue].NAVIGATION_TYPE_ID ? sqlRouteData[positionValue].NAVIGATION_TYPE_ID : null;
			let selectBoard = sqlRouteData[positionValue].BOARD_TYPE_ID ? sqlRouteData[positionValue].BOARD_TYPE_ID : null;
			let selectPage = sqlRouteData[positionValue].ELEMENT_PAGE_ID ? sqlRouteData[positionValue].ELEMENT_PAGE_ID : null;

			// ETAPA 1:
			// Seleccionar / asignar la pagina correspondiente:

			if (Page[selectPage].type === 'main') {
				history.push(Page[selectPage].to);
			} else if (Page[selectPage].type === 'sidebar') {
				dispatch({
					type: "SET_PREV_NAV",
					payload: next,
				});

				dispatch({
					type: "SET_NEXT_NAV",
					payload: Page[selectPage].to,
				});
			};


			// ETAPA 2:
			// Cambiar tablero de acuerdo a la tarjeta que se muestra

			if (selectBoard !== null) {
				dispatch({
					type: 'SET_BOARD',
					payload: Board[selectBoard]
				});
			};

			/*POR VALIDAR Y DEPURAR*/

			if (selectBoard === 20) {
				// Necesito poder filtar el caso para enviar la selección:
				let data_negotiation = state.negotiation.data_negotiations;

				let negotiationSelected = data_negotiation.filter(item => item.ENVIRONMENT === 'case' && item.CASE_TYPE_ID === sqlRouteData[0].CASE_TYPE_ID);

				if (negotiationSelected.length > 0) {
					await updateBoard(dispatch, 'cases', negotiationSelected[0]);
				}
			}

			if (selectBoard === 30) {
				// modulo de navegación y selección de negociación en desarrollo...
				let data_negotiation = state.negotiation.data_negotiations;

				let negotiationSelected = data_negotiation.filter(item => item.ENVIRONMENT === 'negotiation' && item.ID === sqlRouteData[0].NEGOTIATION_TYPE_ID);

				if (negotiationSelected.length > 0 && state.negotiation.id_negotiation !== negotiationSelected[0].ID) {
					await updateBoard(dispatch, 'negotiations', negotiationSelected[0]);
				}
			};
			/*FIN*/

			// ETAPA 3:
			// Cambiar ambiente de acuerdo a la tarjeta que se muestra

			if (selectNavigation !== null) {
				dispatch({
					type: 'SET_RESOURCE',
					payload: Navigation[selectNavigation].to
				});
			};

			// ETAPA 4:
			// Cambiar componente del canvas

			if (selectComponent !== null) {
				dispatch({
					type: "SET_NAVIGATION_CANVAS",
					payload: "component",
				});

				dispatch({
					type: "SET_FILTER",
					payload: { ...filter, [Navigation[selectNavigation].to]: selectComponent },
				});

				dispatch({
					type: "SET_SELECTION",
					payload: { 0: selectComponent, 1: 0, 2: 0, 3: 0 },
				});
			};

			dispatch({
				type: 'SET_SKINWELCOME',
				payload: true
			});

			dispatch({
				type: 'SET_LOADING',
				payload: false
			});

		} catch (error) {
			console.log('Execute knowledge route error: ', error);
			dispatch({
				type: 'SET_LOADING',
				payload: true
			});
		}
	}

};

// Función que se ejecuta para cambiar de una tarjeta a otra del tutorial guiado
export async function nextTutorialCard (dispatch, history, currentGuide, action) {

	let state = configureStore().getState();
	// let next = state.sidebar.next;
	// let user = state.profile.profile;
	let filter = state.canvas.filter;
	let tutorialData = state.tutorial.tutorialData;
	let routeInit = state.tutorial.routeInit;

	// const Page = {
	// 	10: {name: 'BOARD', type: 'main', to: '/canvas'},
	// 	20: {name: 'PROFILE', type: 'main', to: '/account/profile'},
	// 	30: {name: 'NOTIFICATIONS', type: 'sidebar', to: 'notification'},
	// 	40: {name: 'CHAT', type: 'sidebar', to: 'chat'},
	// 	50: {name: 'PLANNER', type: 'sidebar', to: 'calendar'},
	// 	60: {name: 'PLANNER', type: 'main', to: '/calendar'},
	// };

	const Board = {
		10:	'theory',
		20:	'case',
		30:	'negotiations',
		99:	'n/a',
	};

	const Navigation = {
		10: {name: 'PROCESS', to: 'process'},
		20: {name: 'CANVAS', to: 'canvas'},
		30: {name: 'ACTORS', to: 'actors'},
		40: {name: 'JOURNEY', to: 'journey'},
		99: {name: 'n/a', to: ''},
		50: {name: 'DIMENSIONS', to: 'dimensions'},
	};

	let nextCard = tutorialData.CARDS[action === 'next' ? currentGuide.value + 1 : currentGuide.value - 1]

	if (nextCard !== undefined) {

		// Construcción de variables para la navegación donde inicia la ruta:
		let selectComponent = nextCard.CANVAS_COMPONENT_ID ? Number((nextCard.CANVAS_COMPONENT_ID).toFixed(1)) : null;
		let selectNavigation = nextCard.NAVIGATION_TYPE_ID ? nextCard.NAVIGATION_TYPE_ID : null;
		let selectBoard = nextCard.BOARD_TYPE_ID ? nextCard.BOARD_TYPE_ID : null;
		// let selectPage = nextCard.ELEMENT_PAGE_ID ? nextCard.ELEMENT_PAGE_ID : null;

		// ETAPA 1:
		// Seleccionar / asignar la pagina correspondiente:

		// if (Page[selectPage].type === 'main') {
		// 	history.push(Page[selectPage].to);
		// } else if (Page[selectPage].type === 'sidebar') {
		// 	dispatch({
		// 		type: "SET_PREV_NAV",
		// 		payload: next,
		// 	});

		// 	dispatch({
		// 		type: "SET_NEXT_NAV",
		// 		payload: Page[selectPage].to,
		// 	});
		// };


		// ETAPA 2:
		// Cambiar tablero de acuerdo a la tarjeta que se muestra

		if (selectBoard !== null) {
			dispatch({
				type: 'SET_BOARD',
				payload: Board[selectBoard]
			});
		};

		/*POR VALIDAR Y DEPURAR*/

		if (selectBoard === 20) {
			// Necesito poder filtar el caso para enviar la selección:
			let data_negotiation = state.negotiation.data_negotiations;

			let negotiationSelected = data_negotiation.filter(item => item.ENVIRONMENT === 'case' && item.CASE_TYPE_ID === nextCard.CASE_TYPE_ID);

			if (negotiationSelected.length > 0) {
				await updateBoard(dispatch, 'cases', negotiationSelected[0]);
			}
		}

		if (selectBoard === 30) {
			// modulo de navegación y selección de negociación en desarrollo...
			let data_negotiation = state.negotiation.data_negotiations;

			let negotiationSelected = data_negotiation.filter(item => item.ENVIRONMENT === 'negotiation' && item.ID === nextCard.NEGOTIATION_TYPE_ID);

			if (negotiationSelected.length > 0 && state.negotiation.id_negotiation !== negotiationSelected[0].ID) {
				await updateBoard(dispatch, 'negotiations', negotiationSelected[0]);
			}
		};
		/*FIN*/

		// ETAPA 3:
		// Cambiar ambiente de acuerdo a la tarjeta que se muestra

		if (selectNavigation !== null) {
			dispatch({
				type: 'SET_RESOURCE',
				payload: Navigation[selectNavigation].to
			});
		};

		// ETAPA 4:
		// Cambiar componente del canvas

		if (selectComponent !== null) {
			dispatch({
				type: "SET_NAVIGATION_CANVAS",
				payload: "component",
			});

			dispatch({
				type: "SET_FILTER",
				payload: { ...filter, [Navigation[selectNavigation].to]: selectComponent },
			});

			dispatch({
				type: "SET_SELECTION",
				payload: { 0: selectComponent, 1: 0, 2: 0, 3: 0 },
			});
		};

		// Cambiar propiedad STATE de tarjeta seleccionada, para controlar cual se muestra al cerrar y volver a abrir una ruta
		// let newTutorialCards = tutorialData.CARDS.map(card => {
		// 	if (card.ID === nextCard.ID) {
		// 		return { ...card, STATE: 'Completed' }
		// 	} else {
		// 		return card
		// 	}
		// })

		// dispatch({
		// 	type: 'SET_TUTORIAL_DATA',
		// 	payload: { ...tutorialData, CARDS: newTutorialCards}
		// });

		dispatch({
			type: 'SET_CURRENT_GUIDE',
			payload: { ...currentGuide, value: action === 'next' ? currentGuide.value + 1 : currentGuide.value - 1},
		});

		dispatch({
			type: 'SET_ROUTE_STATE',
			payload: { ...routeInit, CURRENT: nextCard }
		})

		if (nextCard.BUTTON === 'CONTROL_HELPBOT' || nextCard.BUTTON === 'CONTROL_EXPLORE' || nextCard.BUTTON === 'CONTROL_SURVEY') {
			dispatch({
				type: 'SET_OPEN_CONTACT_CENTER',
				payload: true
			});
		} else {
			dispatch({
				type: 'SET_OPEN_CONTACT_CENTER',
				payload: false
			});
		};

		if (nextCard.TYPE_CARD === 'Wizard') {
			dispatch({
				type: 'SET_SKINWELCOME',
				payload: false
			});
		} else if (nextCard.TYPE_CARD === 'Tour') {
			dispatch({
				type: 'SET_SKINWELCOME',
				payload: true
			});
		}
	} else {
		dispatch({
			type: 'SET_TUTORIAL_DATA',
			payload: { ...tutorialData, ID: 0, NAME: '', TYPE: '', CARDS: []}
		})
		dispatch({
			type: 'SET_CURRENT_GUIDE',
			payload: { ...currentGuide, value: 0 },
		});
		dispatch({
			type: 'SET_ROUTE_STATE',
			payload: { ...routeInit, ACTIVE: false, CURRENT: {} }
		})
		dispatch({
			type: 'SET_OPEN_CONTACT_CENTER',
			payload: false
		})
		dispatch({
			type: 'SET_SKINWELCOME',
			payload: false
		});
	}
};

// Función para crear una push notification con la ejecución de diferentes eventos
export function createPushNotification (dispatch, description, eventType, iconColor, iconNotification, wiselink, route, state) {
	let noti1 = {
		ID: Date.now(),
		DESCRIPTION: description,
		TYPE_NOTIFICATION: eventType,
		ICON_COLOR: iconColor,
		NOTIFICATION_ICON: iconNotification,
		WISELINK_ID: wiselink,
		ROUTE_ID: route,
		STATE: state
	};

	dispatch({
		type: "ADD_NOTIFICATIONS_ITEMS",
		payload: noti1,
	});
};

export function pushNotificationMessage (lang, event) {
	let message = {
		'createNegotiation': {
			'es': "La negociación se creó exitosamente",
			'en': "The negotiation was created successfully",
			'it': "***The negotiation was created successfully"
		},
		'updateNegotiation': {
			'es': "La negociación se actualizó exitosamente",
			'en': "The negotiation was updated successfully",
			'it': "***The negotiation was updated successfully"
		},
		'updateNegotiationTeam': {
			'es': "Se actualizó el equipo de la negociación exitosamente",
			'en': "The negotiation team was updated successfully",
			'it': "***The negotiation team was updated successfully"
		},
		'create': {
			'es': "Se creó exitosamente",
			'en': "It was created successfully",
			'it': "***It was created successfully",
		},
		'delete': {
			'es': "Se eliminó exitosamente",
			'en': "It was deleted successfully",
			'it': "***It was deleted successfully",
		},
		'update': {
			'es': "Se actualizó exitosamente",
			'en': "It was updated successfully",
			'it': "***It was updated successfully",
		},
		'select': {
			'es': "Se seleccionó exitosamente",
			'en': "It was selected successfully",
			'it': "It was selected successfully",
		},
		'unselect': {
			'es': "Se deseleccionó exitosamente",
			'en': "It was unselected successfully",
			'it':	"***It was unselected successfully"
		},
		'park': {
			'es': "Se parqueó exitosamente",
			'en': "It was parked successfully",
			'it':	"***It was parked successfully"
		},
		'limitCharacter': {
			'es': "No se puede realizar el pegado de texto debido a que supera el maximo de caracteres 2000.",
			'en': "Cannot paste text because it exceeds the maximum of 2000 characters.",
			'it': "***Cannot paste text because it exceeds the maximum of 2000 characters."
		},
		'duplicate': {
			'es': "Se duplico exitosamente",
			'en': "It was duplicated successfully",
			'it': "***It was duplicated successfully"
		},
		'successToSave': {
			'es': "Información guardada con éxito",
			'en': "The information was saved successfully",
			'it': "***The information was saved successfully"
		},
		'errorToSave': {
			'es': "No se pudo guardar la información",
			'en': "The information could not be saved",
			'it': "***The information could not be saved"
		},
		'sendEmail': {
			'es': "Se envió exitosamente",
			'en': "It was sended succesfully",
			'it': "***It was sended succesfully"
		}
	};
	
	return message[event][lang];
};


export function handleUserTools (dispatch, tool = '') {
	if ( tool !== '' ) {
    dispatch({
      type: 'SET_TOOL',
      payload: tool
    });
		dispatch({
			type: 'SET_OPEN_USERTOOLS',
			payload: true
		});
	} else {
		dispatch({
			type: 'SET_OPEN_USERTOOLS',
			payload: false
		});
		dispatch({
			type: 'SET_TOOL',
			payload: tool
		});
	}
};

export function getBoardNavigation (resource = 'n/a',board = 'n/a') {
	let result = [];

	const Board = {
		'theory': 10,
		'case':	20,
		'negotiations': 30,
		'n/a': 99,
	};

	const Navigation = {
		'process': {id: 10, name: 'PROCESS', to: 'process'},
		'canvas': {id: 20, name: 'CANVAS', to: 'canvas'},
		'actor': {id: 30, name: 'ACTORS', to: 'actors'},
		'journey': {id: 40, name: 'JOURNEY', to: 'journey'},
		'n/a': {id: 99,name: 'n/a', to: ''},
		'dimensions': {id: 50, name: 'DIMENSIONS', to: 'dimensions'},
	};


	result.push(Board[board],Navigation[resource].id);
	return result;
};

export async function getFeedbackUser(user, caseId, versionId) {
	try {
		let sqlFeedbackUser = await dbservice(`select ID, FEEDBACK_${user.LANG} as FEEDBACK, FEEDBACK_TITLE_${user.LANG} as NAME, CASE_TYPE_ID, CASE_VERSION_ID, FEEDBACK_TYPE, SURVEY_ID, "ORDER", SHOW from FEEDBACK_USER where CASE_TYPE_ID = ${caseId} and CASE_VERSION_ID = ${versionId} and ACTIVE = 'Y' order by "ORDER"`);

		return sqlFeedbackUser;
	} catch (error) {
		console.log('getFeedbackUser', error);
	}
}

export async function getFeedbackData(dispatch, workshopId, user, t, feedbackData) {
	try {
		let sqlFeedbackUser = await dbservice(`select ID, FEEDBACK_${user.LANG} as FEEDBACK, FEEDBACK_TITLE_${user.LANG} as NAME, CASE_TYPE_ID, CASE_VERSION_ID, FEEDBACK_TYPE, SURVEY_ID, SHOW from FEEDBACK_USER where CASE_TYPE_ID = ${feedbackData.CASE_TYPE_ID} and CASE_VERSION_ID = ${feedbackData.CASE_VERSION_ID} and ID = ${feedbackData.ID} and ACTIVE = 'Y'`);
		
		if (sqlFeedbackUser.length > 0) {
			if (sqlFeedbackUser[0].FEEDBACK_TYPE === null || sqlFeedbackUser[0].FEEDBACK_TYPE === 'null') {
				let reportBasicData = [];
				let userData = {};
				let userFeedback = sqlFeedbackUser[0];
				let sqlCaseTeamWorks = await dbservice(`select ID from NEGOTIATION where CASE_VERSION_ID = ${feedbackData.CASE_VERSION_ID} and WORKSHOP_ID = ${workshopId} AND ACTIVE = 'Y'`);
				let teamsIds = sqlCaseTeamWorks.map(team => team.ID);
	
				let usersRoles = await dbservice(`select A.USER_ID, A.NEGOTIATION_ROLE, B.DESCRIPTION as TEAMWORK from NEGOTIATION_USER A, NEGOTIATION B where A.NEGOTIATION_ID IN (${teamsIds}) and A.NEGOTIATION_ID = B.ID and A.ACTIVE = 'Y' and B.ACTIVE = 'Y'`);
	
				let sqlReportBasic = await dbservice(`select a.user_id, e.email, a.survey_id, d.name as name_survey, c.id as question_id, c.name_en as question, b.name_en as answer, a.field_answer, c.orden, f.first_name, f.last_name
				from survey_register a, answer_element b, question_element c, survey d, user1 e, user_profile f
				where a.answer_id=b.id
				and a.question_element_id = c.id
				and a.user_id = e.id
				and a.survey_id = d.id
				and a.answer = 1
				and a.workshop_id = ${workshopId}
				and a.state = 'Done'
				and a.survey_id = ${feedbackData.SURVEY_ID}
				and e.id = f.user_id
				and a.user_id = ${user.ID}
				and c.active='Y'
				and b.active='Y'
				order by a.user_id, c.orden, question_id`);
	
				if (sqlReportBasic.length > 0) {
					reportBasicData = sqlReportBasic.map(data => {
						let userDataRole = usersRoles.filter(user => user.USER_ID === data.USER_ID);
		
						if (userDataRole.length > 0) {
							return { ...data, ROLE: userDataRole[0].NEGOTIATION_ROLE === '1' ? t("Part") : userDataRole[0].NEGOTIATION_ROLE === '0' ? t("Counterpart") : userDataRole[0].NEGOTIATION_ROLE, TEAMWORK: userDataRole[0].TEAMWORK, USER_NAME: `${data.FIRST_NAME} ${data.LAST_NAME}` }
						} else {
							return { ...data, USER_NAME: `${data.FIRST_NAME} ${data.LAST_NAME}` }
						}
					});
				}
					
				if (userFeedback.FEEDBACK !== null) {
					userData = {
						NOMBRE: reportBasicData[0].USER_NAME,
						ROLE: reportBasicData[0].ROLE,
						AGREEMENT: reportBasicData[0].ANSWER,
						AGREEMENT_TYPE: reportBasicData[0].ANSWER === 'Yes' ? reportBasicData[7].ANSWER : '',
						FINAL_PRICE: reportBasicData[0].ANSWER === 'Yes' ? Number(reportBasicData[1].FIELD_ANSWER) : '',
						FIRST_OFFER: reportBasicData[0].ANSWER === 'Yes' ? `${(reportBasicData[0].ROLE).charAt(0)}${(reportBasicData[2].ANSWER).charAt(0)}` : '',
						FIRST_OFFER_VALUE: reportBasicData[0].ANSWER === 'Yes' ? reportBasicData[2].ANSWER === reportBasicData[2].ROLE ? Number(reportBasicData[3].FIELD_ANSWER) : reportBasicData[3].ANSWER : '',
						// COUNTEROFFER: reportBasicData[2].ANSWER === reportBasicData[2].ROLE ? 'FirstOffer' : 'CounterOffer', // Si tiene un valor, aplica la recomendación, sino depende del rol para mostrarla
						COUNTEROFFERTITLE: reportBasicData[0].ANSWER === 'Yes' ? reportBasicData[2].ANSWER === reportBasicData[2].ROLE ? 'Valor primera oferta' : "Contraoferta" : '',
						TARGET: reportBasicData[0].ANSWER === 'Yes' ? reportBasicData[4].ANSWER : '',
						TARGET_VALUE: reportBasicData[0].ANSWER === 'Yes' ? Number(reportBasicData[5].FIELD_ANSWER) : '',
						DISCOVER: reportBasicData[0].ANSWER === 'Yes' ? reportBasicData[6].ANSWER : '',
						ASSOCIATE: reportBasicData[0].ANSWER === 'Yes' ? reportBasicData[7].ANSWER : '',
						OTHER_BARGAINING_CHIPS: reportBasicData[0].ANSWER === 'Yes' ? reportBasicData[8].ANSWER : '',
					};
					
					let diccionario = {};
					diccionario.USER_ID = user.ID;
					diccionario.NOMBRE = userData.NOMBRE;
					diccionario.ROLE = userData.ROLE;
					diccionario.AGREEMENT = userData.AGREEMENT;
					diccionario.AGREEMENT_RESULT  = userData.AGREEMENT === 'Yes' && userData.AGREEMENT_TYPE === 'Yes' ? 'Óptimo' : "Sub óptimo"
					diccionario.FINAL_PRICE = userData.FINAL_PRICE;
					diccionario.FIRST_OFFER = userData.FIRST_OFFER;
					diccionario.FIRST_OFFER_VALUE = userData.FIRST_OFFER_VALUE;
					diccionario.COUNTEROFFER = userData.COUNTEROFFER;
					diccionario.COUNTEROFFERTITLE = userData.COUNTEROFFERTITLE;
					diccionario.OTHER_BARGAINING_CHIPS = userData.OTHER_BARGAINING_CHIPS;
					diccionario.TARGET = userData.TARGET;
					diccionario.TARGET_VALUE = userData.TARGET_VALUE;
					diccionario.DISCOVER = userData.DISCOVER;
					diccionario.ASSOCIATE = userData.ASSOCIATE;
					
					const rta = await rcmProcess(user.ID, userFeedback.FEEDBACK, diccionario);
	
					dispatch({
						type: 'SET_FEEDBACK_CONTENT',
						payload: rta.content
					});
	
					dispatch({ 
						type: 'SET_FEEDBACK_OPEN_PDF', 
						payload: true 
					});
				}
			} else {      
				let sqlTeamworkCases = await dbservice(`select ID, DESCRIPTION from NEGOTIATION where WORKSHOP_ID = ${workshopId} AND CASE_TYPE_ID = ${feedbackData.CASE_TYPE_ID} AND CASE_VERSION_ID = ${feedbackData.CASE_VERSION_ID} AND ACTIVE = 'Y'`);
				
				let teamworksIds = sqlTeamworkCases.map(team => team.ID);
								
				let sqlTeamworksUsers = await dbservice(`select A.ID, A.EMAIL, B.FIRST_NAME, B.LAST_NAME, C.NEGOTIATION_ID, C.NEGOTIATION_ROLE from USER1 A, USER_PROFILE B, NEGOTIATION_USER C where NEGOTIATION_ID IN (${teamworksIds}) and A.ID = B.USER_ID and A.ID = C.USER_ID and A.ACTIVE = 'Y' and B.ACTIVE = 'Y' and C.ACTIVE = 'Y'`);
				
				let sqlCaseRoles = await dbservice(`select ROLES_NAME from CASE_TYPE where ID = ${feedbackData.CASE_TYPE_ID} and ACTIVE = 'Y' order by ID`);
      
				let caseRoles = sqlCaseRoles[0].ROLES_NAME.split(',');

				let userTeamwork = sqlTeamworksUsers.map(user => {
					let teamwork = sqlTeamworkCases.filter(team => team.ID === user.NEGOTIATION_ID)[0];
					let name = teamwork.DESCRIPTION.split('-');
					let groupNumber = (name[1].trim()).split(" ")[1];

					return {
						...user,
						TEAMWORK_NAME: teamwork.DESCRIPTION,
						TEAM: `${name.length > 1 ? `${name[0].trim()} - ${name[1].trim()}` : name[0]}`,
						GROUP_NUMBER: groupNumber
					}
				});

				let filterUserTeamwork = userTeamwork.filter(userTeam => userTeam.ID === user.ID)[0];

				let usersSameTeam = userTeamwork.filter(user => user.TEAM === filterUserTeamwork.TEAM && user.NEGOTIATION_ROLE === filterUserTeamwork.NEGOTIATION_ROLE);
				
				let userIndex = usersSameTeam.findIndex(item => item.ID === user.ID);
				
				let orderByRole = caseRoles.map(role => {
					let usersByRole = userTeamwork.filter(user => user.NEGOTIATION_ROLE === role);

					return {
						ROLE: role,
						USERS: usersByRole
					}
				});

				let filterByTeam = orderByRole.filter(item => item.ROLE !== filterUserTeamwork.NEGOTIATION_ROLE).map(item => {
					let usersByTeam = item.USERS.filter(user => user.TEAM === filterUserTeamwork.TEAM);

					return {
						...item,
						USERS: usersByTeam
					}
				});
				
				let counterParts = [];

				filterByTeam.forEach(team => {
					counterParts.push(team.USERS[userIndex]);
				});
				
				let userDictionary = {
					ID: filterUserTeamwork.ID,
					NAME: `${filterUserTeamwork.FIRST_NAME} ${filterUserTeamwork.LAST_NAME}`,
					EMAIL: filterUserTeamwork.EMAIL,
					ROLE: filterUserTeamwork.NEGOTIATION_ROLE,
					TEAM: filterUserTeamwork.TEAM,
					TEAMWORK: filterUserTeamwork.TEAMWORK_NAME,
					GROUP_NUMBER:  filterUserTeamwork.GROUP_NUMBER,
					COUNTERPARTNAME: counterParts.length > 0 ? `${counterParts[0].FIRST_NAME} ${counterParts[0].LAST_NAME}` : {},
					COUNTERPARTEMAIL: counterParts.length > 0 ? counterParts[0].EMAIL : {},
					COUNTERPARTROLE: counterParts.length > 0 ? counterParts[0].NEGOTIATION_ROLE : {},
					COUNTERPARTTEAMWORK: counterParts.length > 0 ? counterParts[0].TEAMWORK_NAME : {},
					COUNTERPARTNAME2: counterParts.length > 1 ? `${counterParts[1].FIRST_NAME} ${counterParts[1].LAST_NAME}` : {},
					COUNTERPARTEMAIL2: counterParts.length > 1 ? counterParts[1].EMAIL : {},
					COUNTERPARTROLE2: counterParts.length > 1 ? counterParts[1].NEGOTIATION_ROLE : {},
					COUNTERPARTTEAMWORK2: counterParts.length > 1 ? counterParts[1].TEAMWORK_NAME : {},
					COUNTERPARTNAME3: counterParts.length > 2 ? `${counterParts[2].FIRST_NAME} ${counterParts[2].LAST_NAME}` : {},
					COUNTERPARTEMAIL3: counterParts.length > 2 ? counterParts[2].EMAIL : {},
					COUNTERPARTROLE3: counterParts.length > 2 ? counterParts[2].NEGOTIATION_ROLE : {},
					COUNTERPARTTEAMWORK3: counterParts.length > 2 ? counterParts[2].TEAMWORK_NAME : {},
					COUNTERPARTNAME4: counterParts.length > 3 ? `${counterParts[3].FIRST_NAME} ${counterParts[3].LAST_NAME}` : {},
					COUNTERPARTEMAIL4: counterParts.length > 3 ? counterParts[3].EMAIL : {},
					COUNTERPARTROLE4: counterParts.length > 3 ? counterParts[3].NEGOTIATION_ROLE : {},
					COUNTERPARTTEAMWORK4: counterParts.length > 3 ? counterParts[3].TEAMWORK_NAME : {},
				}

				const rta = await rcmProcess(user.ID, feedbackData.FEEDBACK, userDictionary);
	
				dispatch({
					type: 'SET_FEEDBACK_CONTENT',
					payload: rta.content
				});

				dispatch({ 
					type: 'SET_FEEDBACK_OPEN_PDF', 
					payload: true 
				});
			}
		} else {
			dispatch({
				type: 'SET_FEEDBACK_DATA',
				payload: []
			});
		}
	} catch (error) {
		console.log('getFeedbackData', error);
	}
}

