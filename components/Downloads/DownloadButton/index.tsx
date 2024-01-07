'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import Button from '@/components/Common/Button';
import { useDetectOS } from '@/hooks';
import type { NodeRelease } from '@/types';
import { downloadUrlByOS } from '@/util/downloadUrlByOS';

import styles from './index.module.css';

type DownloadButtonProps = { release: NodeRelease };

const DownloadButton: FC<PropsWithChildren<DownloadButtonProps>> = ({
  release: { versionWithPrefix },
  children,
}) => {
  const { os, bitness } = useDetectOS();

  return (
    <>
      <Button
        kind="special"
        href={downloadUrlByOS(versionWithPrefix, os, bitness)}
        className={classNames(styles.downloadButton, 'hidden dark:flex')}
      >
        {children}

        <ArrowRightIcon />
      </Button>

      <Button
        kind="primary"
        href={downloadUrlByOS(versionWithPrefix, os, bitness)}
        className={classNames(styles.downloadButton, 'flex dark:hidden')}
      >
        {children}

        <ArrowRightIcon />
      </Button>
    </>
  );
};

export default DownloadButton;
