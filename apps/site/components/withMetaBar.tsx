'use client';

import { useFormatter } from 'next-intl';
import type { FC } from 'react';

import MetaBar from '@/components/Containers/MetaBar';
import GitHub from '@/components/Icons/Social/GitHub';
import Link from '@/components/Link';
import WithAvatarGroup from '@/components/withAvatarGroup';
import { useClientContext } from '@/hooks/react-client';
import useMediaQuery from '@/hooks/react-client/useMediaQuery';
import { DEFAULT_DATE_FORMAT } from '@/next.calendar.constants.mjs';
import { getGitHubBlobUrl } from '@/util/gitHubUtils';

const WithMetaBar: FC = () => {
  const { headings, readingTime, frontmatter, filename } = useClientContext();
  const formatter = useFormatter();
  const lastUpdated = frontmatter.date
    ? formatter.dateTime(new Date(frontmatter.date), DEFAULT_DATE_FORMAT)
    : undefined;

  const usernames =
    frontmatter.authors?.split(',').map(author => author.trim()) ?? [];

  // Since we cannot show the same number of avatars in Mobile / Tablet
  // resolution as we do on desktop and there is overflow, we are adjusting
  // the number of avatars manually for the resolutions below
  const isMobileResolution = useMediaQuery('(max-width: 670px)');
  const isTabletResolution = useMediaQuery(
    '(min-width: 670px) and (max-width: 1280px)'
  );

  return (
    <MetaBar
      items={{
        'components.metabar.lastUpdated': lastUpdated,
        'components.metabar.readingTime': readingTime.text,
        ...(usernames.length && {
          [`components.metabar.${usernames.length > 1 ? 'authors' : 'author'}`]:
            (
              <WithAvatarGroup
                usernames={usernames}
                limit={isMobileResolution ? 7 : isTabletResolution ? 5 : 9}
              />
            ),
        }),
        'components.metabar.contribute': (
          <>
            <GitHub className="fill-neutral-700 dark:fill-neutral-100" />
            <Link href={getGitHubBlobUrl(filename)}>Edit this page</Link>
          </>
        ),
      }}
      headings={{ items: headings }}
    />
  );
};

export default WithMetaBar;
