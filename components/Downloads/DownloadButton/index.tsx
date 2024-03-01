'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import Button from '@/components/Common/Button';
import { useDetectOS } from '@/hooks';
import type { NodeRelease } from '@/types';
import { getNodeDownloadUrl } from '@/util/getNodeDownloadUrl';

import styles from './index.module.css';

type DownloadButtonProps = { release: NodeRelease };

const DownloadButton: FC<PropsWithChildren<DownloadButtonProps>> = ({
  release: { versionWithPrefix },
  children,
}) => {
  const { os, bitness } = useDetectOS();
  const downloadLink = getNodeDownloadUrl(versionWithPrefix, os, bitness);

  return (
    <>
      <Button
        kind="special"
        href={downloadLink}
        className={classNames(styles.downloadButton, styles.special)}
      >
        {children}

        <ArrowRightIcon />
      </Button>

      <Button
        kind="primary"
        href={downloadLink}
        className={classNames(styles.downloadButton, styles.primary)}
      >
        {children}

        <ArrowRightIcon />
      </Button>
    </>
  );
};

export default DownloadButton;
