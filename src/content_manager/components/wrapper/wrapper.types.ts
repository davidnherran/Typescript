export interface WrapperProps {
  children: React.ReactNode;
  contentData?: any;
  ƒcreateSegment: (segment: any) => void;
  isDndDisabled?: boolean
}