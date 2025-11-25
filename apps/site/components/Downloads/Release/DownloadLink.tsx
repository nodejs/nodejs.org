'use client';

import { useContext } from 'react';

import DownloadLinkBase from '#site/components/Downloads/DownloadLink';
import { ReleaseContext } from '#site/providers/releaseProvider';

import type { DownloadKind } from '#site/types/download';
import type { FC, PropsWithChildren } from 'react';

type DownloadLinkProps = { kind?: DownloadKind };

const DownloadLink: FC<PropsWithChildren<DownloadLinkProps>> = ({
  kind = 'installer',
  children,
}) => {
  const { release } = useContext(ReleaseContext);

  return (
    <DownloadLinkBase release={release} kind={kind}>
      {children}
    </DownloadLinkBase>
  );
};

export default DownloadLink;
