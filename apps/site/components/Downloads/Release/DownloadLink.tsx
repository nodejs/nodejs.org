'use client';

import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';

import DownloadLinkBase from '@/components/Downloads/DownloadLink';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { DownloadKind } from '@/util/getNodeDownloadUrl';

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
