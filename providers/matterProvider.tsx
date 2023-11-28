'use client';

import type { Heading } from '@vcarl/remark-headings';
import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type { ReadTimeResults } from 'reading-time';

import type { LegacyFrontMatter } from '@/types';

type MatterContext = {
  frontmatter: LegacyFrontMatter;
  headings: Heading[];
  readingTime: ReadTimeResults;
  filename: string;
};

export const MatterContext = createContext<MatterContext>({
  frontmatter: {},
  headings: [],
  readingTime: { text: '', minutes: 0, time: 0, words: 0 },
  filename: '',
});

type MatterProviderProps = PropsWithChildren<MatterContext>;

export const MatterProvider: FC<MatterProviderProps> = ({
  frontmatter,
  headings,
  readingTime,
  filename,
  children,
}) => (
  <MatterContext.Provider
    value={{ frontmatter, headings, readingTime, filename }}
  >
    {children}
  </MatterContext.Provider>
);
