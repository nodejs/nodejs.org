'use client';

import { use } from 'react';

import Link from '#site/components/Link';
import { ReleaseContext } from '#site/providers/releaseProvider';

import type { FC, PropsWithChildren } from 'react';

const BlogPostLink: FC<PropsWithChildren> = ({ children }) => {
  const { release } = use(ReleaseContext);
  const version = release.versionWithPrefix;

  return <Link href={`/blog/release/${version}`}>{children}</Link>;
};

export default BlogPostLink;
