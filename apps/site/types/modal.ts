import type { PropsWithChildren } from 'react';

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

export type ModalType = 'release' | 'eol';

export type ModalProviderProps = PropsWithChildren<{
  type: ModalType;
}>;
