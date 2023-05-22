import LocalizedLink from '../LocalizedLink';
import { useNextraContext } from '../../hooks/useNextraContext';
import { getNodejsChangelog } from '../../util/getNodeJsChangelog';
import type { NodeReleaseData } from '../../types';
import type { FC } from 'react';

const HomeDownloadButton: FC<NodeReleaseData> = ({
  version,
  versionWithPrefix,
  major,
  isLts,
}) => {
  const {
    frontMatter: { labels },
  } = useNextraContext();

  const nodeDownloadLink = `https://nodejs.org/dist/${versionWithPrefix}/`;
  const nodeApiLink = `https://nodejs.org/dist/latest-v${major}.x/docs/api/`;
  const nodeAllDownloadsLink = `/download${isLts ? '/' : '/current'}`;
  const nodeDownloadTitle =
    `${labels.download} ${version}` + ` ${labels[isLts ? 'lts' : 'current']}`;

  return (
    <div className="home-downloadblock">
      <a
        href={nodeDownloadLink}
        className="home-downloadbutton"
        title={nodeDownloadTitle}
        data-version={versionWithPrefix}
      >
        {version} {labels[isLts ? 'lts' : 'current']}
        <small>{labels[`tagline-${isLts ? 'lts' : 'current'}`]}</small>
      </a>

      <ul className="list-divider-pipe home-secondary-links">
        <li>
          <LocalizedLink href={nodeAllDownloadsLink}>
            {labels['other-downloads']}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink href={getNodejsChangelog(versionWithPrefix)}>
            {labels.changelog}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink href={nodeApiLink}>{labels.api}</LocalizedLink>
        </li>
      </ul>
    </div>
  );
};

export default HomeDownloadButton;
