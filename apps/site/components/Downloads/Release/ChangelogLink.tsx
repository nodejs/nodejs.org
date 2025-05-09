'use client';

import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';

import Link from '#site/components/Link';
import LinkWithArrow from '#site/components/LinkWithArrow';
import { BASE_CHANGELOG_URL } from '#site/next.constants.mjs';
import { ReleaseContext } from '#site/providers/releaseProvider';

const ChangelogLink: FC<PropsWithChildren> = ({ children }) => {
  const { release } = useContext(ReleaseContext);

  return (
    <LinkWithArrow asChild>
      <Link href={`${BASE_CHANGELOG_URL}${release.version}`}>{children}</Link>
    </LinkWithArrow>
  );
};

export default ChangelogLink;
