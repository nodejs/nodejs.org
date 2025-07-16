'use client';

import type { FC, PropsWithChildren, ComponentType } from 'react';
import { createContext, useState } from 'react';

import ReleaseModal from '../components/Downloads/ReleaseModal';
import EOLModal from '../components/EOL/Modal';

export type ModalProps = {
  open: boolean;
  closeModal: () => void;
  data: unknown;
};

type ModalContextType = {
  data: unknown;
  openModal: (data: unknown) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  data: null,
  openModal: () => {},
  closeModal: () => {},
});

const MODALS: Record<string, ComponentType<ModalProps>> = {
  release: ReleaseModal,
  eol: EOLModal,
};

type ModalProviderProps = PropsWithChildren<{
  type: keyof typeof MODALS;
}>;

export const ModalProvider: FC<ModalProviderProps> = ({ type, children }) => {
  const [data, setData] = useState<unknown>(null);
  const ModalComponent = MODALS[type];

  const openModal = (newData: unknown) => {
    setData(newData);
  };

  const closeModal = () => {
    setData(null);
  };

  return (
    <ModalContext.Provider value={{ data, openModal, closeModal }}>
      {children}
      {!!data && (
        <ModalComponent open={!!data} closeModal={closeModal} data={data} />
      )}
    </ModalContext.Provider>
  );
};
