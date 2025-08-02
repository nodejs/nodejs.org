'use client';

import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';

import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import { BASE_CHANGELOG_URL } from '#site/next.constants.mjs';
import { ReleaseContext } from '#site/providers/releaseProvider';

const ChangelogLink: FC<PropsWithChildren> = ({ children }) => {
  const { release } = useContext(ReleaseContext);

  return (
    <LinkWithArrow href={`${BASE_CHANGELOG_URL}${release.version}`}>
      {children}
    </LinkWithArrow>
  );
};

export default ChangelogLink;
