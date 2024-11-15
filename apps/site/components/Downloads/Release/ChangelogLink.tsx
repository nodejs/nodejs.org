'use client';

import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';

import LinkWithArrow from '@/components/Downloads/Release/LinkWithArrow';
import Link from '@/components/Link';
import { ReleaseContext } from '@/providers/releaseProvider';

const BASE_CHANGELOG_URL = 'https://github.com/nodejs/node/releases/tag/v';

const ChangelogLink: FC<PropsWithChildren> = ({ children }) => {
  const { release } = useContext(ReleaseContext);

  return (
    <LinkWithArrow asChild>
      <Link href={`${BASE_CHANGELOG_URL}${release.version}`}>{children}</Link>
    </LinkWithArrow>
  );
};

export default ChangelogLink;
