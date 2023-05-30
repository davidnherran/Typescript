import { TSegments } from './segment.types';

export type TContent = {
  ID: string;
  NAME: string;
  DESCRIPTION: string;
  COVER: string;
  CATEGORY: string;
  CLIENT_ID: string; // TODO: REMOVE THIS FIELD IN REFACTORED API
  SEGMENTS: TSegments[];
};