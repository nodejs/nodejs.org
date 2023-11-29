'use client';

import type { Heading } from '@vcarl/remark-headings';
import { createContext } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type { ReadTimeResults } from 'reading-time';

import type { LegacyFrontMatter } from '@/types';

type MatterContext = {
  frontmatter: LegacyFrontMatter;
  pathname: string;
  headings: Heading[];
  readingTime: ReadTimeResults;
  filename: string;
};

export const MatterContext = createContext<MatterContext>({
  frontmatter: {},
  pathname: '',
  headings: [],
  readingTime: { text: '', minutes: 0, time: 0, words: 0 },
  filename: '',
});

type MatterProviderProps = PropsWithChildren<MatterContext>;

export const MatterProvider: FC<MatterProviderProps> = ({
  children,
  ...data
}) => <MatterContext.Provider value={data}>{children}</MatterContext.Provider>;
