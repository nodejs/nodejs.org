import MetaBarContainer from '@node-core/ui-components/Containers/MetaBar';
import GitHubIcon from '@node-core/ui-components/Icons/Social/GitHub';
import { defaultLocale } from '@node-core/website-i18n';
import { getFormatter, getLocale, getTranslations } from 'next-intl/server';

import { getClientContext } from '#site/client-context';
import AvatarGroup from '#site/components/AvatarGroup';
import Link from '#site/components/Link';
import { DEFAULT_DATE_FORMAT } from '#site/next.calendar.constants.mjs';
import { TRANSLATION_URL } from '#site/next.constants.mjs';
import { getGitHubBlobUrl } from '#site/util/github';

import type { FC } from 'react';

const MetaBar: FC = async () => {
  const { headings, readingTime, frontmatter, filename } = getClientContext();

  const t = await getTranslations();
  const locale = await getLocale();
  const formatter = await getFormatter();

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

  return (
    <MetaBarContainer
      heading={t('components.metabar.tableOfContents')}
      as={Link}
      aria-label={t('components.metabar.metadata')}
      items={{
        [t('components.metabar.lastUpdated')]: lastUpdated,
        [t('components.metabar.readingTime')]: readingTimeText,
        ...(usernames.length && {
          [t(
            `components.metabar.${usernames.length > 1 ? 'authors' : 'author'}`
          )]: <AvatarGroup usernames={usernames} limit={8} compactLimit={5} />,
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

export default MetaBar;
