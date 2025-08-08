'use client';

import { createContext, useState } from 'react';
import type { FC, ComponentType, PropsWithChildren } from 'react';

import type { ModalContextType, ModalProps } from '#site/types/modal';

export const ModalContext = createContext<ModalContextType>({
  data: null,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: FC<
  PropsWithChildren<{ Component: ComponentType<ModalProps> }>
> = ({ Component, children }) => {
  const [data, setData] = useState<unknown>(null);

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
        <Component open={!!data} closeModal={closeModal} data={data} />
      )}
    </ModalContext.Provider>
  );
};
