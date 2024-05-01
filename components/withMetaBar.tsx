import { useFormatter } from 'next-intl';
import type { FC } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import MetaBar from '@/components/Containers/MetaBar';
import GitHub from '@/components/Icons/Social/GitHub';
import Link from '@/components/Link';
import { useClientContext } from '@/hooks/server';
import { DEFAULT_DATE_FORMAT } from '@/next.calendar.constants.mjs';
import { getGitHubBlobUrl, getGitHubAvatarUrl } from '@/util/gitHubUtils';
import { getAcronymFromString } from '@/util/stringUtils';

const WithMetaBar: FC = () => {
  const { headings, readingTime, frontmatter, filename } = useClientContext();
  const formatter = useFormatter();
  const lastUpdated = frontmatter.date
    ? formatter.dateTime(new Date(frontmatter.date), DEFAULT_DATE_FORMAT)
    : undefined;

  const usernames =
    frontmatter.authors?.split(',').map(author => author.trim()) ?? [];
  const avatars = usernames.map(username => ({
    src: getGitHubAvatarUrl(username),
    alt: getAcronymFromString(username),
  }));

  return (
    <MetaBar
      items={{
        'components.metabar.lastUpdated': lastUpdated,
        'components.metabar.readingTime': readingTime.text,
        ...(avatars.length && {
          [`components.metabar.${avatars.length > 1 ? 'authors' : 'author'}`]: (
            <AvatarGroup avatars={avatars} limit={8} />
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
