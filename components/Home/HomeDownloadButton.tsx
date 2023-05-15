import LocalizedLink from '../LocalizedLink';
import { useNextraContext } from '../../hooks/useNextraContext';
import { getNodejsChangelog } from '../../util/getNodeJsChangelog';
import type { NodeReleaseData } from '../../types';
import type { FC } from 'react';

type HomeDownloadButtonProps = {
  nodeReleaseData: NodeReleaseData;
};

const HomeDownloadButton: FC<HomeDownloadButtonProps> = ({
  nodeReleaseData,
}) => {
  const {
    frontMatter: { labels },
  } = useNextraContext();

  const nodeDownloadLink = `https://nodejs.org/dist/v${nodeReleaseData.version}/`;
  const nodeApiLink = `https://nodejs.org/dist/latest-v${nodeReleaseData.major}.x/docs/api/`;
  const nodeAllDownloadsLink = `/download${
    nodeReleaseData.isLts ? '/' : '/current'
  }`;
  const nodeDownloadTitle =
    `${labels.download} ${nodeReleaseData.version}` +
    ` ${labels[nodeReleaseData.isLts ? 'lts' : 'current']}`;

  return (
    <div className="home-downloadblock">
      <a
        href={nodeDownloadLink}
        className="home-downloadbutton"
        title={nodeDownloadTitle}
        data-version={`v${nodeReleaseData.version}`}
      >
        {nodeReleaseData.version}{' '}
        {labels[nodeReleaseData.isLts ? 'lts' : 'current']}
        <small>
          {labels[`tagline-${nodeReleaseData.isLts ? 'lts' : 'current'}`]}
        </small>
      </a>

      <ul className="list-divider-pipe home-secondary-links">
        <li>
          <LocalizedLink href={nodeAllDownloadsLink}>
            {labels['other-downloads']}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink
            href={getNodejsChangelog(`v${nodeReleaseData.version}`)}
          >
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
