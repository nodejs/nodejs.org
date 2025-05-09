'use client';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import Button from '#site/components/Common/Button';
import { useClientContext } from '#site/hooks';
import type { NodeRelease } from '#site/types';
import { getNodeDownloadUrl } from '#site/util/getNodeDownloadUrl';
import { getUserPlatform } from '#site/util/getUserPlatform';

import styles from './index.module.css';

type DownloadButtonProps = { release: NodeRelease };

const DownloadButton: FC<PropsWithChildren<DownloadButtonProps>> = ({
  release: { versionWithPrefix },
  children,
}) => {
  const { os, bitness, architecture } = useClientContext();

  const platform = getUserPlatform(architecture, bitness);
  const downloadLink = getNodeDownloadUrl(versionWithPrefix, os, platform);

  return (
    <>
      <Button
        kind="special"
        href={downloadLink}
        className={classNames(styles.downloadButton, styles.special)}
      >
        {children}

        <CloudArrowDownIcon />
      </Button>

      <Button
        kind="primary"
        href={downloadLink}
        className={classNames(styles.downloadButton, styles.primary)}
      >
        {children}

        <CloudArrowDownIcon />
      </Button>
    </>
  );
};

export default DownloadButton;
