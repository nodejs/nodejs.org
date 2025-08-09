export type ModalProps<T = unknown> = {
  open: boolean;
  closeModal: () => void;
  data: T;
};

export type ModalContextType<T = unknown> = {
  data: T;
  openModal: (data: unknown) => void;
  closeModal: () => void;
};
