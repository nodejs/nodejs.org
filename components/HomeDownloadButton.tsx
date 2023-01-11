import LocalisedLink from '../components/LocalisedLink';
import { useNextraContext } from '../hooks/useNextraContext';
import { getNodejsChangelog } from '../util/getNodeJsChangelog';

import type { NodeVersionData } from '../types';

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
    `${labels?.download} ${props.nodeNumeric}` +
    ` ${labels?.[props.isLts ? 'lts' : 'current']}`;

  return (
    <div className="home-downloadblock">
      <a
        href={nodeDownloadLink}
        className="home-downloadbutton"
        title={nodeDownloadTitle}
        data-version={props.node}
      >
        {props.nodeNumeric} {labels?.[props.isLts ? 'lts' : 'current']}
        <small>{labels?.[`tagline-${props.isLts ? 'lts' : 'current'}`]}</small>
      </a>

      <ul className="list-divider-pipe home-secondary-links">
        <li>
          <LocalisedLink href="/download/">
            {labels?.['other-downloads']}
          </LocalisedLink>
        </li>
        <li>
          <LocalisedLink href={getNodejsChangelog(props.node)}>
            {labels?.changelog}
          </LocalisedLink>
        </li>
        <li>
          <LocalisedLink href={nodeApiLink}>{labels?.api}</LocalisedLink>
        </li>
      </ul>
    </div>
  );
};

export default HomeDownloadButton;
