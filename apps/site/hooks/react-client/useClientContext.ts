'use client';

import { useContext } from 'react';

import { MatterContext } from '@/providers/matterProvider';
import type { ClientSharedServerContext } from '@/types';

const useClientContext = (): ClientSharedServerContext => {
  const { frontmatter, pathname, headings, readingTime, filename } =
    useContext(MatterContext);

  return { pathname, frontmatter, headings, readingTime, filename };
};

export default useClientContext;
