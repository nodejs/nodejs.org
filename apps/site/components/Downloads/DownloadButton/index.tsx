import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import Button from '#site/components/Common/Button';
import { getNodeDownloadUrl } from '#site/util/url';

import type { NodeRelease } from '#site/types';
import type { DownloadOptions } from '#site/util/url';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type DownloadButtonProps = { release: NodeRelease } & Pick<
  DownloadOptions,
  'os' | 'platform'
>;

const DownloadButton: FC<PropsWithChildren<DownloadButtonProps>> = ({
  release: { versionWithPrefix },
  os,
  platform,
  children,
}) => {
  const downloadLink = getNodeDownloadUrl({ versionWithPrefix, os, platform });

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
