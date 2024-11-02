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

  // Doing that because on mobile list on top of page and on desktop list on the right side
  const shortAvatarList = useMediaQuery(
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
                limit={shortAvatarList ? 4 : 6}
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
