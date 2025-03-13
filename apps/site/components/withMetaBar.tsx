'use client';

import MetaBar from '@node-core/ui-components/Containers/MetaBar';
import GitHubIcon from '@node-core/ui-components/Icons/Social/GitHub';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';
import WithAvatarGroup from '@/components/withAvatarGroup';
import { useClientContext } from '@/hooks/react-client';
import useMediaQuery from '@/hooks/react-client/useMediaQuery';
import { DEFAULT_DATE_FORMAT } from '@/next.calendar.constants.mjs';
import { TRANSLATION_URL } from '@/next.constants.mjs';
import { defaultLocale } from '@/next.locales.mjs';
import { getGitHubBlobUrl } from '@/util/gitHubUtils';

const WithMetaBar: FC = () => {
  const { headings, readingTime, frontmatter, filename } = useClientContext();
  const formatter = useFormatter();
  const lastUpdated = frontmatter.date
    ? formatter.dateTime(new Date(frontmatter.date), DEFAULT_DATE_FORMAT)
    : undefined;
  const readingTimeText = formatter.number(readingTime.minutes, {
    style: 'unit',
    unit: 'minute',
    maximumFractionDigits: 0,
  });

  const usernames =
    frontmatter.authors?.split(',').map(author => author.trim()) ?? [];

  const t = useTranslations();
  const locale = useLocale();

  // Since we cannot show the same number of avatars in Mobile / Tablet
  // resolution as we do on desktop and there is overflow, we are adjusting
  // the number of avatars manually for the resolutions below
  const isMobileResolution = useMediaQuery('(max-width: 670px)');
  const isTabletResolution = useMediaQuery(
    '(min-width: 670px) and (max-width: 1280px)'
  );

  return (
    <MetaBar
      heading={t('components.metabar.tableOfContents')}
      as={Link}
      items={{
        [t('components.metabar.lastUpdated')]: lastUpdated,
        [t('components.metabar.readingTime')]: readingTimeText,
        ...(usernames.length && {
          [t(
            `components.metabar.${usernames.length > 1 ? 'authors' : 'author'}`
          )]: (
            <WithAvatarGroup
              usernames={usernames}
              limit={isMobileResolution ? 7 : isTabletResolution ? 5 : 9}
            />
          ),
        }),
        [t('components.metabar.contribute')]: (
          <>
            <GitHubIcon className="fill-neutral-700 dark:fill-neutral-100" />
            <Link
              href={
                locale === defaultLocale.code
                  ? getGitHubBlobUrl(filename)
                  : TRANSLATION_URL
              }
            >
              {t('components.metabar.contributeText')}
            </Link>
          </>
        ),
      }}
      headings={{ items: headings }}
    />
  );
};

export default WithMetaBar;
