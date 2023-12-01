import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';
import { useSiteNavigation } from '@/hooks/server';
import type { NodeRelease } from '@/types';

const DownloadList: FC<NodeRelease> = ({ versionWithPrefix }) => {
  const t = useTranslations();

  const { getSideNavigation } = useSiteNavigation();

  const [[, downloadNavigationItems]] = getSideNavigation(['download'], {
    shaSums: { nodeVersion: versionWithPrefix },
    allDownloads: { nodeVersion: versionWithPrefix },
  });

  return (
    <section>
      <ul>
        {downloadNavigationItems.items.map(([key, { label, link }]) => (
          <li key={key}>
            <Link href={link}>{label}</Link>
            {key === 'shaSums' && (
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
