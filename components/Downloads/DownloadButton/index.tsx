'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import Button from '@/components/Common/Button';
import { useDetectOS } from '@/hooks';
import { useRouter } from '@/navigation.mjs';
import type { NodeRelease } from '@/types';
import { downloadUrlByOS } from '@/util/downloadUrlByOS';

import styles from './index.module.css';

type DownloadButtonProps = { release: NodeRelease };

const DownloadButton: FC<PropsWithChildren<DownloadButtonProps>> = ({
  release: { versionWithPrefix },
  children,
}) => {
  const { os, bitness } = useDetectOS();
  const { push } = useRouter();

  const nodeDownloadLink = downloadUrlByOS(versionWithPrefix, os, bitness);

  const onDownloadNode = () => push(nodeDownloadLink);

  return (
    <>
      <Button
        variant="special"
        onClick={onDownloadNode}
        className={classNames(styles.downloadButton, 'hidden dark:flex')}
      >
        {children}

        <ArrowRightIcon />
      </Button>

      <Button
        variant="primary"
        onClick={onDownloadNode}
        className={classNames(styles.downloadButton, 'flex dark:hidden')}
      >
        {children}

        <ArrowRightIcon />
      </Button>
    </>
  );
};

export default DownloadButton;
