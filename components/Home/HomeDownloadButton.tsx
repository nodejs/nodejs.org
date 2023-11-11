'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';
import { useDetectOS } from '@/hooks';
import { DIST_URL } from '@/next.constants.mjs';
import type { NodeRelease } from '@/types';
import { downloadUrlByOS } from '@/util/downloadUrlByOS';
import { getNodejsChangelog } from '@/util/getNodeJsChangelog';

const HomeDownloadButton: FC<NodeRelease> = ({
  major,
  version,
  versionWithPrefix,
  isLts,
}) => {
  const { os, bitness } = useDetectOS();
  const t = useTranslations();

  const nodeDownloadLink = downloadUrlByOS(versionWithPrefix, os, bitness);
  const nodeApiLink = `${DIST_URL}latest-v${major}.x/docs/api/`;
  const nodeAllDownloadsLink = `/download${isLts ? '/' : '/current'}`;

  const downloadFile = t('components.home.homeDownloadButton.download', {
    version,
    isLts,
  });

  return (
    <div className="home-downloadblock">
      <a
        href={nodeDownloadLink}
        className="home-downloadbutton"
        title={downloadFile}
        data-version={versionWithPrefix}
      >
        {downloadFile}

        <small>
          {t('components.home.homeDownloadButton.tagline', { isLts })}
        </small>
      </a>

      <ul className="list-divider-pipe home-secondary-links">
        <li>
          <Link href={nodeAllDownloadsLink}>
            {t('components.home.homeDownloadButton.otherDownloads')}
          </Link>
        </li>

        <li>
          <a href={getNodejsChangelog(versionWithPrefix)}>
            {t('components.home.homeDownloadButton.changelog')}
          </a>
        </li>

        <li>
          <a href={nodeApiLink}>
            {t('components.home.homeDownloadButton.apiDocs')}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HomeDownloadButton;
