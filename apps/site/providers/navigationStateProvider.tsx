'use client';

import { createContext, useRef } from 'react';

import type { FC, PropsWithChildren } from 'react';

type NavigationStateContextType = Record<string, { x: number; y: number }>;

export const NavigationStateContext = createContext<NavigationStateContextType>(
  {}
);

export const NavigationStateProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const navigationState = useRef<NavigationStateContextType>({});

  return (
    // eslint-disable-next-line react-hooks/refs
    <NavigationStateContext.Provider value={navigationState.current}>
      {children}
    </NavigationStateContext.Provider>
  );
};
