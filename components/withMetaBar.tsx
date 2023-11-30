import { useFormatter } from 'next-intl';
import type { FC } from 'react';

import MetaBar from '@/components/Common/MetaBar';
import GitHub from '@/components/Icons/Social/GitHub';
import Link from '@/components/Link';
import { useClientContext } from '@/hooks/server';
import { getGitHubEditPageUrl } from '@/util/gitHubUtils';

const WithMetaBar: FC = () => {
  const { headings, readingTime, frontmatter, filename } = useClientContext();
  const formatter = useFormatter();

  const lastUpdated = formatter.dateTime(frontmatter.date ?? new Date(), {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <MetaBar
      items={{
        'components.metabar.lastUpdated': lastUpdated,
        'components.metabar.readingTime': readingTime.text,
        'components.metabar.contribute': (
          <>
            <GitHub className="fill-neutral-700 dark:fill-neutral-100" />
            <Link href={getGitHubEditPageUrl(filename)}>Edit this page</Link>
          </>
        ),
      }}
      headings={{ items: headings }}
    />
  );
};

export default WithMetaBar;
