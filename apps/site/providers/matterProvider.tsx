'use client';

import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';

import { useDetectOS } from '#site/hooks';
import type { ClientSharedServerContext } from '#site/types';
import { assignClientContext } from '#site/util/context';

export const MatterContext = createContext<ClientSharedServerContext>(
  assignClientContext({})
);

type MatterProviderProps = PropsWithChildren<
  Partial<ClientSharedServerContext>
>;

export const MatterProvider: FC<MatterProviderProps> = ({
  children,
  ...data
}) => {
  const os = useDetectOS();

  return (
    <MatterContext.Provider value={assignClientContext({ ...os, ...data })}>
      {children}
    </MatterContext.Provider>
  );
};
