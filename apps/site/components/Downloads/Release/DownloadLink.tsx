'use client';

import { use } from 'react';

import DownloadLinkBase from '#site/components/Downloads/DownloadLink';
import { ReleaseContext } from '#site/providers/releaseProvider';

import type { DownloadKind } from '#site/types/download';
import type { FC, PropsWithChildren } from 'react';

type DownloadLinkProps = { kind?: DownloadKind };

const DownloadLink: FC<PropsWithChildren<DownloadLinkProps>> = ({
  kind = 'installer',
  children,
}) => {
  const { release, os, platform } = use(ReleaseContext);

  return (
    <DownloadLinkBase
      release={release}
      kind={kind}
      os={os}
      platform={platform || undefined}
    >
      {children}
    </DownloadLinkBase>
  );
};

export default DownloadLink;
