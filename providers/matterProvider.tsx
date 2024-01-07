'use client';

import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';

import { defineClientContext } from '@/client-context';
import type { ClientSharedServerContext } from '@/types';

export const MatterContext = createContext<ClientSharedServerContext>(
  defineClientContext({})
);

type MatterProviderProps = PropsWithChildren<
  Partial<ClientSharedServerContext>
>;

export const MatterProvider: FC<MatterProviderProps> = ({
  children,
  ...data
}) => (
  <MatterContext.Provider value={defineClientContext(data)}>
    {children}
  </MatterContext.Provider>
);
