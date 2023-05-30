export interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  ƒcloseModal: () => void;
}