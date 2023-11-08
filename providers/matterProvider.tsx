'use client';

import type { Heading } from '@vcarl/remark-headings';
import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';

import type { LegacyFrontMatter } from '@/types';

type MatterContext = { matter: LegacyFrontMatter; headings: Heading[] };

export const MatterContext = createContext<MatterContext>({
  matter: {},
  headings: [],
});

type MatterProviderProps = PropsWithChildren<{
  matter: LegacyFrontMatter;
  headings: Heading[];
}>;

export const MatterProvider: FC<MatterProviderProps> = ({
  matter,
  headings,
  children,
}) => (
  <MatterContext.Provider value={{ matter, headings }}>
    {children}
  </MatterContext.Provider>
);
