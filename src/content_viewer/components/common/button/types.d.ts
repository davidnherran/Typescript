export type ButtonProps = {
  icon: string;
  handleClick: () => void;
  tooltip: string;
  onMouseOver?: () => void;
  style?: React.CSSProperties;
};