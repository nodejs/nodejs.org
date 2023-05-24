import { FormattedMessage } from 'react-intl';
import LocalizedLink from '../LocalizedLink';
import { useNavigation } from '../../hooks/useNavigation';
import type { NodeRelease } from '../../types';
import type { FC } from 'react';

const DownloadList: FC<NodeRelease> = ({ versionWithPrefix }) => {
  const { getSideNavigation } = useNavigation();

  const [, ...downloadNavigation] = getSideNavigation('download', {
    shaSums: { nodeVersion: versionWithPrefix },
    allDownloads: { nodeVersion: versionWithPrefix },
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
