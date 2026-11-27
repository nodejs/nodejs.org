import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import Button from '#site/components/Common/Button';
import { getNodeDownloadUrl } from '#site/util/url';

import type { NodeRelease } from '#site/types';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type DownloadButtonProps = { release: NodeRelease };

const DownloadButton: FC<PropsWithChildren<DownloadButtonProps>> = ({
  release: { versionWithPrefix },
  children,
}) => {
  // The OS is only known in the browser, so this links to the source tarball
  const downloadLink = getNodeDownloadUrl({ versionWithPrefix });

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
