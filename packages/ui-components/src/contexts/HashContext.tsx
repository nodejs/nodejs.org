'use client';

import { createContext, use } from 'react';

type HashContextType = {
  hash: string;
  setHash: (newHash: string) => void;
};

export const HashContext = createContext<HashContextType>({
  hash: '',
  setHash: () => {},
});

export const useHashContext = () => use(HashContext);
