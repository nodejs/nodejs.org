import LocalizedLink from '../LocalizedLink';
import { useNextraContext } from '../../hooks/useNextraContext';
import { getNodejsChangelog } from '../../util/getNodeJsChangelog';
import type { NodeVersionData } from '../../types';
import type { FC } from 'react';

type HomeDownloadButtonProps = Pick<
  NodeVersionData,
  'isLts' | 'node' | 'nodeMajor' | 'nodeNumeric'
>;

const HomeDownloadButton: FC<HomeDownloadButtonProps> = ({
  node,
  nodeMajor,
  nodeNumeric,
  isLts,
}) => {
  const {
    frontMatter: { labels },
  } = useNextraContext();

  const nodeDownloadLink = `https://nodejs.org/dist/${node}/`;
  const nodeApiLink = `https://nodejs.org/dist/latest-${nodeMajor}/docs/api/`;
  const nodeAllDownloadsLink = `/download${isLts ? '/' : '/current'}`;
  const nodeDownloadTitle =
    `${labels.download} ${nodeNumeric}` +
    ` ${labels[isLts ? 'lts' : 'current']}`;

  return (
    <div className="home-downloadblock">
      <a
        href={nodeDownloadLink}
        className="home-downloadbutton"
        title={nodeDownloadTitle}
        data-version={node}
      >
        {nodeNumeric} {labels[isLts ? 'lts' : 'current']}
        <small>{labels[`tagline-${isLts ? 'lts' : 'current'}`]}</small>
      </a>

      <ul className="list-divider-pipe home-secondary-links">
        <li>
          <LocalizedLink href={nodeAllDownloadsLink}>
            {labels['other-downloads']}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink href={getNodejsChangelog(node)}>
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
