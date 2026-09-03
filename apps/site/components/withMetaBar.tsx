'use client';

import CollapsedSidebarRail from '@node-core/ui-components/Common/CollapsedSidebarRail';
import SidebarToggleButton from '@node-core/ui-components/Common/SidebarToggleButton';
import MetaBar from '@node-core/ui-components/Containers/MetaBar';
import GitHubIcon from '@node-core/ui-components/Icons/Social/GitHub';
import { defaultLocale } from '@node-core/website-i18n';
import { useFormatter, useLocale, useTranslations } from 'next-intl';

import Link from '#site/components/Link';
import WithAvatarGroup from '#site/components/withAvatarGroup';
import useClientContext from '#site/hooks/useClientContext';
import useMediaQuery from '#site/hooks/useMediaQuery';
import { DEFAULT_DATE_FORMAT } from '#site/next.calendar.constants.mjs';
import { TRANSLATION_URL } from '#site/next.constants.mjs';
import { useSidebarState } from '#site/providers/sidebarStateProvider';
import { getGitHubBlobUrl } from '#site/util/github';

import type { FC } from 'react';

const WithMetaBar: FC<{ disableToggle?: boolean }> = ({
  disableToggle = false,
}) => {
  const { headings, readingTime, frontmatter, filename } = useClientContext();
  const formatter = useFormatter();
  const lastUpdated = frontmatter.date
    ? // "frontmatter.date" is deterministic

      formatter.dateTime(new Date(frontmatter.date), DEFAULT_DATE_FORMAT)
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
  const { isRightSidebarCollapsed, toggleRightSidebar } = useSidebarState();

  // Since we cannot show the same number of avatars in Mobile / Tablet
  // resolution as we do on desktop and there is overflow, we are adjusting
  // the number of avatars manually for the resolutions below
  const isSmallerThanDesktop = useMediaQuery('(max-width: 1280px)');

  // Check if there's any content to show in the metabar
  const hasContent =
    lastUpdated ||
    readingTimeText ||
    usernames.length > 0 ||
    headings.length > 0;

  // If no content, render empty div to preserve grid structure
  if (!hasContent) {
    return <div />;
  }

  // Show collapsed rail when right sidebar is collapsed and toggle is enabled
  if (isRightSidebarCollapsed && !disableToggle) {
    return (
      <CollapsedSidebarRail side="right">
        <SidebarToggleButton
          side="right"
          isCollapsed={isRightSidebarCollapsed}
          onToggle={toggleRightSidebar}
          ariaLabel={t('components.common.sidebar.expandRightSidebar')}
          title={t('components.common.sidebar.expandRightSidebar')}
        />
      </CollapsedSidebarRail>
    );
  }

  return (
    <MetaBar
      heading={t('components.metabar.tableOfContents')}
      as={Link}
      aria-label={t('components.metabar.metadata')}
      items={{
        [t('components.metabar.lastUpdated')]: lastUpdated,
        [t('components.metabar.readingTime')]: readingTimeText,
        ...(usernames.length && {
          [t(
            `components.metabar.${usernames.length > 1 ? 'authors' : 'author'}`
          )]: (
            <WithAvatarGroup
              usernames={usernames}
              limit={isSmallerThanDesktop ? 5 : 8}
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
    >
      {!disableToggle && (
        <div className="mb-1 flex justify-end pr-2">
          <SidebarToggleButton
            side="right"
            isCollapsed={isRightSidebarCollapsed}
            onToggle={toggleRightSidebar}
            ariaLabel={
              isRightSidebarCollapsed
                ? t('components.common.sidebar.expandRightSidebar')
                : t('components.common.sidebar.collapseRightSidebar')
            }
            title={
              isRightSidebarCollapsed
                ? t('components.common.sidebar.expandRightSidebar')
                : t('components.common.sidebar.collapseRightSidebar')
            }
          />
        </div>
      )}
    </MetaBar>
  );
};

export default WithMetaBar;
