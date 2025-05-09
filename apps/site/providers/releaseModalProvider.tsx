'use client';

import { createContext, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';

import ReleaseModal from '#site/components/Downloads/ReleaseModal';
import type { NodeRelease } from '#site/types';

type ReleaseModalContextType = {
  activeRelease: NodeRelease | null;
  openModal: (activeRelease: NodeRelease) => void;
  closeModal: () => void;
};

export const ReleaseModalContext = createContext<ReleaseModalContextType>({
  activeRelease: null,
  openModal: () => {},
  closeModal: () => {},
});

export const ReleaseModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeRelease, setValue] = useState<NodeRelease | null>(null);

  const openModal = (activeRelease: NodeRelease) => {
    setValue(activeRelease);
  };

  const closeModal = () => {
    setValue(null);
  };

  return (
    <ReleaseModalContext value={{ activeRelease, openModal, closeModal }}>
      {children}

      {activeRelease && (
        <ReleaseModal
          isOpen={!!activeRelease}
          closeModal={closeModal}
          release={activeRelease}
        />
      )}
    </ReleaseModalContext>
  );
};
