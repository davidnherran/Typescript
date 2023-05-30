type TElement = React.ReactElement;

type TChildren = {
  children: React.ReactNode;
}

type TSegments = {
  ID: string;
  NAME: string;
  FILE: string;
  END: number;
  START: number;
  ORDER: number;
  SEGMENT_PARENT: number;
  SEGMENT_TYPE: string;
  TAG: string;
  THUMBNAIL: string;
};

type TContent = {
  ID: string;
  NAME: string;
  DESCRIPTION: string;
  COVER: string;
  CATEGORY: string;
  CLIENT_ID: string; // TODO: REMOVE THIS FIELD IN REFACTORED API
  SEGMENTS: TSegments[];
};

type TOpenModal = () => void;

interface IContent {
  content: TContent[];
}

interface IContentForm extends IContent {
  openModal: TOpenModal;
}

type IModal = {
  isOpen?: boolean;
  title?: string;
  children?: React.ReactNode;
};

type TTheme = {
  customColor?: string;
  theme: {
    sidebar: {
      background: string;
      width: string;
      paddingLeft: string;
    },
    wrapper: {
      background: string;
    },
    searchbar: {
      background: string;
      border: string;
      color: string;
    },
    cover: {
      color: string;
    },
    button: {
      background: string;
      color: string;
    }
  }
  //styled-components
  [key: string]: any;
  
};

interface IContentPortal {
  content: TContent[];
}

declare module 'ContentPortal' {
  export default function ContentPortal(content: IContentPortal): TElement;
}

interface ButtonProps  {
  icon: string;
  title: string;
  onClick: () => void;
}

type ContentsFormTypes = {
  openModal: () => void;
  appId: string;
  content: any
};