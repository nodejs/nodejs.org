'use client';

import type { FC, PropsWithChildren } from 'react';

import { useDetectOS } from '@/hooks';
import type { NodeRelease } from '@/types';
import { downloadUrlByOS } from '@/util/downloadUrlByOS';

type DownloadLinkProps = { release: NodeRelease };

const DownloadLink: FC<PropsWithChildren<DownloadLinkProps>> = ({
  release: { versionWithPrefix },
  children,
}) => {
  const { os, bitness } = useDetectOS();
  const downloadLink = downloadUrlByOS(versionWithPrefix, os, bitness);

  return <a href={downloadLink}>{children}</a>;
};

export default DownloadLink;
