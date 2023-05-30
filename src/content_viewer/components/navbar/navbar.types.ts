import { TContent } from "../../types/content.types";
import { TVariant } from "../../types/variant.types";

export interface IContentProps {
  content: TContent[];
  variant: TVariant;
  name: string;
}

export interface TNavbarStyled {
  variant: TVariant;
};