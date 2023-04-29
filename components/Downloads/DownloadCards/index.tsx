import { Tabs, TabList } from 'react-tabs';
import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import DownloadCard from './DownloadCard/index';
import type { FC, KeyboardEvent } from 'react';
import type { UserOS } from '../../../types/userOS';

type DownloadCardsProps = {
  version: string;
  userOS: UserOS;
};

const DownloadCards: FC<DownloadCardsProps> = ({ version, userOS }) => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected(!['WIN', 'MAC'].includes(userOS) ? 'SOURCECODE' : userOS);
  }, [userOS]);

  const downloadTypes = [
    {
      name: 'WIN',
      icon: 'windows-download-logo.svg',
      label: 'Windows Installer',
      download: `https://nodejs.org/dist/${version}/node-${version}-x86.msi`,
      filename: `node-${version}-x86.msi`,
    },
    {
      name: 'MAC',
      icon: 'mac-download-logo.svg',
      label: 'MAC Installer',
      download: `https://nodejs.org/dist/${version}/node-${version}.pkg`,
      filename: `node-${version}.pkg`,
    },
    {
      name: 'SOURCECODE',
      icon: 'source-code-download-logo.svg',
      label: 'Source Code',
      download: `https://nodejs.org/dist/${version}/node-${version}.tar.gz`,
      filename: `node-${version}.tar.gz`,
    },
  ];

  return (
    <Tabs tabIndex={-1} className={styles.downloadCardsWrapper}>
      <TabList
        className={styles.downloadCards}
        role="tablist"
        onKeyDown={(e: KeyboardEvent) => {
          const current = downloadTypes.findIndex(d => d.name === selected);

          let step = 0;
          if (e.key === 'ArrowLeft') {
            step = -1;
          } else if (e.key === 'ArrowRight') {
            step = 1;
          }
          if (!step) return;

          const next =
            (current + step + downloadTypes.length) % downloadTypes.length;
          setSelected(downloadTypes[next].name);
        }}
      >
        {downloadTypes.map(d => (
          <DownloadCard
            key={d.name}
            name={d.name}
            icon={d.icon}
            label={d.label}
            download={d.download}
            filename={d.filename}
            selected={selected === d.name}
            onSelect={setSelected}
          />
        ))}
      </TabList>
    </Tabs>
  );
};

export default DownloadCards;
