'use client';

import type { FC, PropsWithChildren } from 'react';

import { useReleaseContext } from '@/providers/releaseProvider';

import LinkWithArrow from './LinkWithArrow';

const BlogPostLink: FC<PropsWithChildren> = ({ children }) => {
  const {
    state: { version },
  } = useReleaseContext();

  return (
    <LinkWithArrow url={`/blog/release/${version}`}>{children}</LinkWithArrow>
  );
};

export default BlogPostLink;
