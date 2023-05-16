import LocalizedLink from '../LocalizedLink';
import { useNextraContext } from '../../hooks/useNextraContext';
import { getNodejsChangelog } from '../../util/getNodeJsChangelog';
import type { NodeReleaseData } from '../../types';
import type { FC } from 'react';

type HomeDownloadButtonProps = {
  release: NodeReleaseData;
};

const HomeDownloadButton: FC<HomeDownloadButtonProps> = ({ release }) => {
  const {
    frontMatter: { labels },
  } = useNextraContext();

  const nodeDownloadLink = `https://nodejs.org/dist/v${release.version}/`;
  const nodeApiLink = `https://nodejs.org/dist/latest-v${release.major}.x/docs/api/`;
  const nodeAllDownloadsLink = `/download${release.isLts ? '/' : '/current'}`;
  const nodeDownloadTitle =
    `${labels.download} ${release.version}` +
    ` ${labels[release.isLts ? 'lts' : 'current']}`;

  return (
    <div className="home-downloadblock">
      <a
        href={nodeDownloadLink}
        className="home-downloadbutton"
        title={nodeDownloadTitle}
        data-version={`v${release.version}`}
      >
        {release.version} {labels[release.isLts ? 'lts' : 'current']}
        <small>{labels[`tagline-${release.isLts ? 'lts' : 'current'}`]}</small>
      </a>

      <ul className="list-divider-pipe home-secondary-links">
        <li>
          <LocalizedLink href={nodeAllDownloadsLink}>
            {labels['other-downloads']}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink href={getNodejsChangelog(`v${release.version}`)}>
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
