import { useFormatter } from 'next-intl';
import type { FC } from 'react';

import MetaBar from '@/components/Containers/MetaBar';
import GitHub from '@/components/Icons/Social/GitHub';
import Link from '@/components/Link';
import { useClientContext } from '@/hooks/server';
import { DEFAULT_DATE_FORMAT } from '@/next.calendar.constants.mjs';
import { getGitHubBlobUrl } from '@/util/gitHubUtils';

const WithMetaBar: FC = () => {
  const { headings, readingTime, frontmatter, filename } = useClientContext();
  const formatter = useFormatter();

  const lastUpdated = frontmatter.date
    ? formatter.dateTime(new Date(frontmatter.date), DEFAULT_DATE_FORMAT)
    : undefined;

  return (
    <MetaBar
      items={{
        'components.metabar.lastUpdated': lastUpdated,
        'components.metabar.readingTime': readingTime.text,
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
