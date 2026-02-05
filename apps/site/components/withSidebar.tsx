'use client';

import Sidebar from '@node-core/ui-components/Containers/Sidebar';
import GitHubIcon from '@node-core/ui-components/Icons/Social/GitHub';
import { defaultLocale } from '@node-core/website-i18n';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useRef } from 'react';

import Link from '#site/components/Link';
import WithAvatarGroup from '#site/components/withAvatarGroup';
import {
  useClientContext,
  useScrollToElement,
  useMediaQuery,
} from '#site/hooks/client';
import { useSiteNavigation } from '#site/hooks/generic';
import { useRouter, usePathname } from '#site/navigation.mjs';
import { DEFAULT_DATE_FORMAT } from '#site/next.calendar.constants.mjs';
import { TRANSLATION_URL } from '#site/next.constants.mjs';
import { getGitHubBlobUrl } from '#site/util/github';

import type { NavigationKeys } from '#site/types';
import type { RichTranslationValues } from 'next-intl';
import type { FC } from 'react';

type WithSidebarProps = {
  navKeys: Array<NavigationKeys>;
  context?: Record<string, RichTranslationValues>;
};

const WithSidebar: FC<WithSidebarProps> = ({ navKeys, context, ...props }) => {
  const { getSideNavigation } = useSiteNavigation();
  const pathname = usePathname()!;
  const locale = useLocale();
  const t = useTranslations();
  const formatter = useFormatter();
  const { push } = useRouter();
  const { frontmatter, readingTime, filename } = useClientContext();
  const sidebarRef = useRef<HTMLElement>(null);

  useScrollToElement('sidebar', sidebarRef);

  const sideNavigation = getSideNavigation(navKeys, context);
  const mappedSidebarItems = (
    navKeys.length === 1 ? sideNavigation[0][1].items : sideNavigation
  ).map(([, { label, items }]) => ({
    groupName: label,
    items: items.map(([, item]) => item),
  }));

  const usernames =
    frontmatter.authors?.split(',').map(author => author.trim()) ?? [];
  const isMobileResolution = useMediaQuery('(max-width: 670px)');
  const isTabletResolution = useMediaQuery(
    '(min-width: 670px) and (max-width: 1280px)'
  );

  return (
    <Sidebar
      ref={sidebarRef}
      groups={mappedSidebarItems}
      pathname={pathname}
      title={t('components.common.sidebar.title')}
      placeholder={frontmatter?.title}
      onSelect={push}
      as={Link}
      {...props}
    >
      <dl>
        {frontmatter.date && (
          <>
            <dt>{t('components.common.sidebar.lastUpdated')}</dt>
            <dd>
              {formatter.dateTime(
                new Date(frontmatter.date),
                DEFAULT_DATE_FORMAT
              )}
            </dd>
          </>
        )}

        <dt>{t('components.common.sidebar.readingTime')}</dt>
        <dd>
          {formatter.number(readingTime.minutes, {
            style: 'unit',
            unit: 'minute',
            maximumFractionDigits: 0,
          })}
        </dd>

        {usernames.length > 0 && (
          <>
            <dt>
              {t(
                `components.common.sidebar.${usernames.length > 1 ? 'authors' : 'author'}`
              )}
            </dt>
            <dd>
              <WithAvatarGroup
                usernames={usernames}
                limit={isMobileResolution ? 7 : isTabletResolution ? 5 : 9}
              />
            </dd>
          </>
        )}

        <dt>{t('components.common.sidebar.contribute')}</dt>
        <dd>
          <GitHubIcon className="fill-neutral-700 dark:fill-neutral-100" />
          <Link
            href={
              locale === defaultLocale.code
                ? getGitHubBlobUrl(filename)
                : TRANSLATION_URL
            }
          >
            {t('components.common.sidebar.contributeText')}
          </Link>
        </dd>
      </dl>
    </Sidebar>
  );
};

export default WithSidebar;
