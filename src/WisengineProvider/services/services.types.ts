export type TSegment = {
  ID: string;
  NAME: string;
  SEGMENT_TYPE: string;
  START: number;
  END: number;
  ORDER: number;
  FILE: string;
  TAG: string;
  THUMBNAIL: string;
  SEGMENT_PARENT: number;
};

export type TContent = {
  ID: string;
  NAME: string;
  CATEGORY: string;
  DESCRIPTION: string;
  COVER: string;
  CLIENT_ID: string; //TODO: REMOVE THIS FIELD IN REFACTORED API
  SEGMENTS: TSegment[];
};

export type TFetchHook = {
  data: TSegment[];
  loading: boolean;
  error: boolean;
};
