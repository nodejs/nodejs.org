'use client';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import Button from '@/components/Common/Button';
import { useDetectOS } from '@/hooks';
import type { NodeRelease } from '@/types';
import { getNodeDownloadUrl } from '@/util/getNodeDownloadUrl';

import styles from './index.module.css';

type DownloadButtonProps = { release?: NodeRelease; downloadLink?: string };

const DownloadButton: FC<PropsWithChildren<DownloadButtonProps>> = ({
  release: { versionWithPrefix = '' } = {},
  downloadLink,
  children,
}) => {
  const { os, bitness } = useDetectOS();
  const downloadHref =
    downloadLink || getNodeDownloadUrl(versionWithPrefix, os, bitness);

  return (
    <>
      <Button
        kind="special"
        href={downloadHref}
        className={classNames(styles.downloadButton, styles.special)}
      >
        {children}

        <CloudArrowDownIcon />
      </Button>

      <Button
        kind="primary"
        href={downloadHref}
        className={classNames(styles.downloadButton, styles.primary)}
      >
        {children}

        <CloudArrowDownIcon />
      </Button>
    </>
  );
};

export default DownloadButton;
