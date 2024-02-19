'use client';

import type { FC, PropsWithChildren } from 'react';

import LinkWithArrow from '@/components/Downloads/Release/LinkWithArrow';
import { useReleaseContext } from '@/providers/releaseProvider';

const BlogPostLink: FC<PropsWithChildren> = ({ children }) => {
  const {
    state: { version },
  } = useReleaseContext();

  return (
    <LinkWithArrow url={`/blog/release/${version}`}>{children}</LinkWithArrow>
  );
};

export default BlogPostLink;
