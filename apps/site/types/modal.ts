export type ModalProps = {
  open: boolean;
  closeModal: () => void;
  data: unknown;
};

export type ModalContextType = {
  data: unknown;
  openModal: (data: unknown) => void;
  closeModal: () => void;
};
