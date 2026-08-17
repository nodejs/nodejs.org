'use client';

import { use } from 'react';

import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import { BASE_CHANGELOG_URL } from '#site/next.constants.mjs';
import { ReleaseContext } from '#site/providers/releaseProvider';

import type { FC, PropsWithChildren } from 'react';

const ChangelogLink: FC<PropsWithChildren> = ({ children }) => {
  const { release } = use(ReleaseContext);

  return (
    <LinkWithArrow href={`${BASE_CHANGELOG_URL}${release.version}`}>
      {children}
    </LinkWithArrow>
  );
};

export default ChangelogLink;
