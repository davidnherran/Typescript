export type ButtonTypes = {
  children?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "cancel";
  disabled?: boolean;
}
