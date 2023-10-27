import type { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import LocalizedLink from '@/components/LocalizedLink';
import { useDetectOS } from '@/hooks/useDetectOS';
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
  const { formatMessage } = useIntl();

  const nodeDownloadLink = downloadUrlByOS(versionWithPrefix, os, bitness);
  const nodeApiLink = `${DIST_URL}latest-v${major}.x/docs/api/`;
  const nodeAllDownloadsLink = `/download${isLts ? '/' : '/current'}`;

  const downloadFile = formatMessage(
    { id: 'components.home.homeDownloadButton.download' },
    { version, isLts }
  );

  return (
    <div className="home-downloadblock">
      <a
        href={nodeDownloadLink}
        className="home-downloadbutton"
        title={downloadFile}
        data-version={versionWithPrefix}
      >
        {downloadFile}

        <FormattedMessage
          id="components.home.homeDownloadButton.tagline"
          tagName="small"
          values={{ isLts }}
        />
      </a>

      <ul className="list-divider-pipe home-secondary-links">
        <li>
          <LocalizedLink href={nodeAllDownloadsLink}>
            <FormattedMessage id="components.home.homeDownloadButton.otherDownloads" />
          </LocalizedLink>
        </li>

        <li>
          <a href={getNodejsChangelog(versionWithPrefix)}>
            <FormattedMessage id="components.home.homeDownloadButton.changelog" />
          </a>
        </li>

        <li>
          <a href={nodeApiLink}>
            <FormattedMessage id="components.home.homeDownloadButton.apiDocs" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HomeDownloadButton;
