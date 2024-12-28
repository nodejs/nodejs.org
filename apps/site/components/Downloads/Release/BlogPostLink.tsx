'use client';

import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';

import Link from '@/components/Link';
import { ReleaseContext } from '@/providers/releaseProvider';

const BlogPostLink: FC<PropsWithChildren> = ({ children }) => {
  const { release } = useContext(ReleaseContext);
  const version = release.versionWithPrefix;

  return <Link href={`/blog/release/${version}`}>{children}</Link>;
};

export default BlogPostLink;
