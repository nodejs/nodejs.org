'use client';

import type { FC, PropsWithChildren } from 'react';

import { useClientContext } from '@/hooks';
import type { NodeRelease } from '@/types';
import { getNodeDownloadUrl } from '@/util/getNodeDownloadUrl';
import { getUserPlatform } from '@/util/getUserPlatform';

type DownloadLinkProps = { release: NodeRelease };

const DownloadLink: FC<PropsWithChildren<DownloadLinkProps>> = ({
  release: { versionWithPrefix },
  children,
}) => {
  const { os, bitness, architecture } = useClientContext();

  const platform = getUserPlatform(architecture, bitness);
  const downloadLink = getNodeDownloadUrl(versionWithPrefix, os, platform);

  return <a href={downloadLink}>{children}</a>;
};

export default DownloadLink;
