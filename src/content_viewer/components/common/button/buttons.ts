import {
  backward,
  forward,
  volume,
  settings,
  mic,
  marker,
  options,
  expand,
  panel,
  edit,
} from "../../../assets/icons";
import './button.css';

export const ButtonsLeft = [
  {
    name: "Atras",
    icon: backward,
  },
  {
    name: "Siguiente",
    icon: forward,
  }
];

export const ButtonsRight = [
  {
    name: "Editar",
    icon: edit,
  },
  {
    name: "Configuracion",
    icon: settings,
  },
  {
    name: "Microfono",
    icon: mic,
  },
  {
    name: "Marcador",
    icon: marker,
  },
  {
    name: "Indice",
    icon: options,
  },
  {
    name: "Panel",
    icon: panel,
  },
];
