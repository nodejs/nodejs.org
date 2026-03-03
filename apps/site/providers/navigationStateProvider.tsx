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
  const navigationStateRef = useRef<NavigationStateContextType>({});

  return (
    <NavigationStateContext value={navigationStateRef.current}>
      {children}
    </NavigationStateContext>
  );
};
