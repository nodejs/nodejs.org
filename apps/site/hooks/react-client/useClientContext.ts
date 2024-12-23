'use client';

import { useContext } from 'react';

import { MatterContext } from '@/providers/matterProvider';
import type { ClientSharedServerContext } from '@/types';

const useClientContext = (): ClientSharedServerContext => {
  const {
    frontmatter,
    pathname,
    headings,
    readingTime,
    filename,
    os,
    architecture,
    bitness,
  } = useContext(MatterContext);

  return {
    pathname,
    frontmatter,
    headings,
    readingTime,
    filename,
    os,
    architecture,
    bitness,
  };
};

export default useClientContext;
