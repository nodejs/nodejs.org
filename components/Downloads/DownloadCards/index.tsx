import { useState, useEffect, useMemo } from 'react';
import { Tabs, TabList } from 'react-tabs';
import DownloadCard from './DownloadCard/index';
import styles from './index.module.scss';
import { useDetectOS } from '@/hooks/useDetectOS';
import { downloadUrlByOS } from '@/util/downloadUrlByOS';
import type { FC, KeyboardEvent } from 'react';
import type { NodeRelease } from '@/types';
import type { UserOS } from '@/types/userOS';

type DownloadCardParams = {
  os: UserOS;
  icon: string;
  label: string;
  download: string;
  filename: string;
};

const DownloadCards: FC<NodeRelease> = ({ versionWithPrefix }) => {
  const [selected, setSelected] = useState('');

  const { os, bitness } = useDetectOS();

  useEffect(() => {
    setSelected(os);
  }, [os]);

  const downloadCardsParams: DownloadCardParams[] = useMemo(
    () => [
      {
        os: 'WIN',
        icon: 'windows-download-logo.svg',
        label: 'Windows Installer',
        download: downloadUrlByOS(versionWithPrefix, 'WIN', bitness),
        filename: `node-${versionWithPrefix}-x${bitness}.msi`,
      },
      {
        os: 'MAC',
        icon: 'mac-download-logo.svg',
        label: 'MAC Installer',
        download: downloadUrlByOS(versionWithPrefix, 'MAC', bitness),
        filename: `node-${versionWithPrefix}.pkg`,
      },
      {
        os: 'OTHER',
        icon: 'source-code-download-logo.svg',
        label: 'Source Code',
        download: downloadUrlByOS(versionWithPrefix, 'OTHER', bitness),
        filename: `node-${versionWithPrefix}.tar.gz`,
      },
    ],
    [versionWithPrefix, bitness]
  );

  return (
    <Tabs tabIndex={-1} className={styles.downloadCardsWrapper}>
      <TabList
        className={styles.downloadCards}
        role="tablist"
        onKeyDown={(e: KeyboardEvent) => {
          const current = downloadCardsParams.findIndex(d => d.os === selected);

          let step = 0;
          if (e.key === 'ArrowLeft') {
            step = -1;
          } else if (e.key === 'ArrowRight') {
            step = 1;
          }
          if (!step) return;

          const next =
            (current + step + downloadCardsParams.length) %
            downloadCardsParams.length;
          setSelected(downloadCardsParams[next].os);
        }}
      >
        {downloadCardsParams.map(d => (
          <DownloadCard
            key={d.os}
            os={d.os}
            icon={d.icon}
            label={d.label}
            download={d.download}
            filename={d.filename}
            selected={selected === d.os}
            onSelect={setSelected}
          />
        ))}
      </TabList>
    </Tabs>
  );
};

export default DownloadCards;
