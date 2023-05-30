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

export type TFetchHook = {
  data: TSegment[];
  loading: boolean;
  error: boolean;
};
