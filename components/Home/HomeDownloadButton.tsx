import LocalizedLink from '../LocalizedLink';
import { useNextraContext } from '../../hooks/useNextraContext';
import { getNodejsChangelog } from '../../util/getNodeJsChangelog';

import type { NodeVersionData } from '../../types';

const DOWNLOAD_LABELS = {
  download: 'Download',
  'other-downloads': 'Other Downloads',
  changelog: 'Changelog',
  api: 'API',
  current: 'Current',
  lts: 'LTS',
  'tagline-current': 'Latest Features',
  'tagline-lts': 'Recommended For Most Users',
};

const HomeDownloadButton = ({
  isLatestLtsVersion,
  nodeVersion,
  nodeMajorVersion,
  nodeNumericVersion,
}: {
  isLatestLtsVersion: boolean;
  nodeVersion: string;
  nodeMajorVersion: number;
  nodeNumericVersion: string;
}) => {
  const {
    frontMatter: { labels },
  } = useNextraContext();

  const NODE_DOWNLOAD_URL = `https://nodejs.org/dist/${nodeVersion}/`;
  const NODE_API_URL = `https://nodejs.org/dist/latest-${nodeMajorVersion}/docs/api/`;

  const nodeDownloadTitle =
    `${DOWNLOAD_LABELS.download} ${nodeNumericVersion}` +
    ` ${labels[isLatestLtsVersion ? 'lts' : 'current']}`;

  return (
    <div className="home-downloadblock">
      <a
        href={NODE_DOWNLOAD_URL}
        className="home-downloadbutton"
        title={nodeDownloadTitle}
        data-version={nodeVersion}
      >
        {nodeNumericVersion} {labels[isLatestLtsVersion ? 'lts' : 'current']}
        <small>{labels[`tagline-${isLatestLtsVersion ? 'lts' : 'current'}`]}</small>
      </a>

      <ul className="list-divider-pipe home-secondary-links">
        <li>
          <LocalizedLink href="/download/">
            {labels['other-downloads']}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink href={getNodejsChangelog(nodeVersion)}>
            {labels.changelog}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink href={NODE_API_URL}>{labels.api}</LocalizedLink>
        </li>
      </ul>
    </div>
  );
};

export default HomeDownloadButton;
