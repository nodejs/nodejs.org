'use client';

import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';

import type { ClientSharedServerContext } from '@/types';
import { assignClientContext } from '@/util/assignClientContext';

export const MatterContext = createContext<ClientSharedServerContext>(
  assignClientContext({})
);

type MatterProviderProps = PropsWithChildren<
  Partial<ClientSharedServerContext>
>;

export const MatterProvider: FC<MatterProviderProps> = ({
  children,
  ...data
}) => (
  <MatterContext.Provider value={assignClientContext(data)}>
    {children}
  </MatterContext.Provider>
);
