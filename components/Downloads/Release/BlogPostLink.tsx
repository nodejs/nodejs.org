'use client';

import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';

import LinkWithArrow from '@/components/Downloads/Release/LinkWithArrow';
import { ReleaseContext } from '@/providers/releaseProvider';

const BlogPostLink: FC<PropsWithChildren> = ({ children }) => {
  const { release } = useContext(ReleaseContext);
  const version = release.versionWithPrefix;

  return (
    <LinkWithArrow href={`/blog/release/${version}`}>{children}</LinkWithArrow>
  );
};

export default BlogPostLink;
