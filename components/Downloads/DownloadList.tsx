import { FormattedMessage } from 'react-intl';
import LocalizedLink from '../LocalizedLink';
import { useNavigation } from '../../hooks/useNavigation';
import type { NodeReleaseData } from '../../types';
import type { FC } from 'react';

type DownloadListProps = {
  nodeReleaseData: NodeReleaseData;
};

const DownloadList: FC<DownloadListProps> = ({ nodeReleaseData }) => {
  const { getSideNavigation } = useNavigation();

  const [, ...downloadNavigation] = getSideNavigation('download', {
    shaSums: { nodeVersion: `v${nodeReleaseData.version}` },
    allDownloads: { nodeVersion: `v${nodeReleaseData.version}` },
  });

  return (
    <section>
      <ul>
        {downloadNavigation.map((item, key) => (
          <li key={key}>
            <LocalizedLink href={item.link}>{item.text}</LocalizedLink>
            {item.key === 'shaSums' && (
              <a href="https://github.com/nodejs/node#verifying-binaries">
                <FormattedMessage id="components.downloadList.links.shaSums.howToVerify" />
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DownloadList;
