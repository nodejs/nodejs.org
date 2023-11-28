'use client';

import { useContext } from 'react';

import { usePathname } from '@/navigation.mjs';
import { MatterContext } from '@/providers/matterProvider';
import type { ClientSharedServerContext } from '@/types';

const useClientContext = (): ClientSharedServerContext => {
  const { frontmatter, headings, readingTime, filename } =
    useContext(MatterContext);

  const pathname = usePathname();

  return {
    pathname: pathname || '',
    frontmatter,
    headings,
    readingTime,
    filename,
  };
};

export default useClientContext;
