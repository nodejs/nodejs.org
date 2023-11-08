import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { useSiteNavigation } from '@/hooks/server';
import { Link } from '@/navigation.mjs';
import type { NodeRelease } from '@/types';

const DownloadList: FC<NodeRelease> = ({ versionWithPrefix }) => {
  const t = useTranslations();

  const { getSideNavigation } = useSiteNavigation();

  const [, ...downloadNavigation] = getSideNavigation('download', {
    shaSums: { nodeVersion: versionWithPrefix },
    allDownloads: { nodeVersion: versionWithPrefix },
  });

  return (
    <section>
      <ul>
        {downloadNavigation.map((item, key) => (
          <li key={key}>
            <Link href={item.link}>{item.text}</Link>
            {item.key === 'shaSums' && (
              <a href="https://github.com/nodejs/node#verifying-binaries">
                {t('components.downloadList.links.shaSums.howToVerify')}
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DownloadList;
