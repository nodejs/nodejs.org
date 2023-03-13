import LocalizedLink from '../LocalizedLink';
import { useNextraContext } from '../../hooks/useNextraContext';
import { getNodejsChangelog } from '../../util/getNodeJsChangelog';

import type { NodeVersionData } from '../../types';

type HomeDownloadButtonProps = Pick<
  NodeVersionData,
  'isLts' | 'node' | 'nodeMajor' | 'nodeNumeric'
>;

const HomeDownloadButton = (props: HomeDownloadButtonProps) => {
  const {
    frontMatter: { labels },
  } = useNextraContext();

  const nodeDownloadLink = `https://nodejs.org/dist/${props.node}/`;
  const nodeApiLink = `https://nodejs.org/dist/latest-${props.nodeMajor}/docs/api/`;

  const nodeDownloadTitle =
    `${labels.download} ${props.nodeNumeric}` +
    ` ${labels[props.isLts ? 'lts' : 'current']}`;

  return (
    <div className="home-downloadblock">
      <a
        href={nodeDownloadLink}
        className="home-downloadbutton"
        title={nodeDownloadTitle}
        data-version={props.node}
      >
        {props.nodeNumeric} {labels[props.isLts ? 'lts' : 'current']}
        <small>{labels[`tagline-${props.isLts ? 'lts' : 'current'}`]}</small>
      </a>

      <ul className="list-divider-pipe home-secondary-links">
        <li>
          <LocalizedLink href="/download/">
            {labels['other-downloads']}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink href={getNodejsChangelog(props.node)}>
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
