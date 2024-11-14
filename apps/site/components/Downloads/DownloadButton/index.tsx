'use client';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import WithButton from '@/components/withButton';
import { useDetectOS } from '@/hooks';
import type { NodeRelease } from '@/types';
import { getNodeDownloadUrl } from '@/util/getNodeDownloadUrl';
import { getUserBitnessByArchitecture } from '@/util/getUserBitnessByArchitecture';

import styles from './index.module.css';

type DownloadButtonProps = { release: NodeRelease };

const DownloadButton: FC<PropsWithChildren<DownloadButtonProps>> = ({
  release: { versionWithPrefix },
  children,
}) => {
  const {
    os,
    bitness: userBitness,
    architecture: userArchitecture,
  } = useDetectOS();
  const bitness = getUserBitnessByArchitecture(userArchitecture, userBitness);
  const downloadLink = getNodeDownloadUrl(versionWithPrefix, os, bitness);

  return (
    <>
      <WithButton
        kind="special"
        href={downloadLink}
        className={classNames(styles.downloadButton, styles.special)}
      >
        {children}

        <CloudArrowDownIcon />
      </WithButton>

      <WithButton
        kind="primary"
        href={downloadLink}
        className={classNames(styles.downloadButton, styles.primary)}
      >
        {children}

        <CloudArrowDownIcon />
      </WithButton>
    </>
  );
};

export default DownloadButton;
