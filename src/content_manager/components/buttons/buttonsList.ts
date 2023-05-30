import {
  scissors,
  copy,
  rec,
  trash,
  share,
  iconPlaceholder
} from "../../assets/icons";

export const buttonsList = [
  {
    id: 0,
    icon: iconPlaceholder,
    name: "CONFIG",
    title: "CONFIG",
    type: "VIDEO, IMAGE, AUDIO, SURVEY, RCM, TAGS, IMAGEN"
  },
  {
    id: 1,
    icon: scissors,
    name: "CUT",
    title: "CORTAR",
    type: "SURVEY, VIDEO, IMAGE"
  },
  {
    id: 2,
    icon: copy,
    name: "COPY",
    title: "COPIAR",
    type: "SURVEY, VIDEO, IMAGE"
  },
  {
    id: 3,
    icon: rec,
    name: "RECORD",
    title: "GRABAR",
    type: "SURVEY, VIDEO, IMAGE"
  },
  {
    id: 4,
    icon: trash,
    name: "DELETE",
    title: "BORRAR",
    type: "SURVEY, VIDEO, IMAGE"
  },
  {
    id: 5,
    icon: share,
    name: "SHARE",
    title: "COMPARTIR",
    type: "SURVEY, VIDEO, IMAGE"
  },
  {
    id: 6,
    icon: iconPlaceholder,
    name: "RCM_PURE",
    title: "RCM",
    type: "RCM"
  },
  {
    id: 7,
    icon: iconPlaceholder,
    name: "RCM_HTML",
    title: "HTML",
    type: "RCM"
  },
];