'use client';

import { useContext } from 'react';

import { MatterContext } from '#site/providers/matterProvider';

import type { ClientSharedServerContext } from '#site/types';

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
