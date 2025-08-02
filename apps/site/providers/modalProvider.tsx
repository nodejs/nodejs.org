'use client';

import type { FC, ComponentType } from 'react';
import { createContext, useState } from 'react';

import ReleaseModal from '#site/components/Downloads/ReleaseModal';
import EOLModal from '#site/components/EOL/EOLModal';
import type {
  ModalContextType,
  ModalProps,
  ModalProviderProps,
  ModalType,
} from '#site/types/modal';

export const ModalContext = createContext<ModalContextType>({
  data: null,
  openModal: () => {},
  closeModal: () => {},
});

const MODALS = {
  release: ReleaseModal,
  eol: EOLModal,
} satisfies Record<ModalType, ComponentType<ModalProps>>;

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
