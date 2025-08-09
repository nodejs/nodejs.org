'use client';

import { createContext, useState } from 'react';
import type { ComponentType, PropsWithChildren } from 'react';

import type { ModalContextType, ModalProps } from '#site/types/modal';

export const ModalContext = createContext<ModalContextType>({
  data: null,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = <T,>({
  Component,
  children,
}: PropsWithChildren<{ Component: ComponentType<ModalProps<T>> }>) => {
  const [data, setData] = useState<T | null>(null);

  const openModal = (newData: T) => {
    setData(newData);
  };

  const closeModal = () => {
    setData(null);
  };

  return (
    <ModalContext.Provider
      value={{ data, openModal, closeModal } as ModalContextType<T>}
    >
      {children}
      {!!data && (
        <Component open={!!data} closeModal={closeModal} data={data} />
      )}
    </ModalContext.Provider>
  );
};
