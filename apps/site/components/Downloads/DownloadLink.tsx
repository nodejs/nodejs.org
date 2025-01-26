'use client';

import type { FC, PropsWithChildren } from 'react';

import LinkWithArrow from '@/components/LinkWithArrow';
import { useClientContext } from '@/hooks';
import type { NodeRelease } from '@/types';
import type { DownloadKind } from '@/util/getNodeDownloadUrl';
import { getNodeDownloadUrl } from '@/util/getNodeDownloadUrl';
import { getUserPlatform } from '@/util/getUserPlatform';

type DownloadLinkProps = { release: NodeRelease; kind?: DownloadKind };

const DownloadLink: FC<PropsWithChildren<DownloadLinkProps>> = ({
  release: { versionWithPrefix },
  kind = 'installer',
  children,
}) => {
  const { os, bitness, architecture } = useClientContext();

  const platform = getUserPlatform(architecture, bitness);

  const downloadLink = getNodeDownloadUrl(
    versionWithPrefix,
    os,
    platform,
    kind
  );

  return <LinkWithArrow href={downloadLink}>{children}</LinkWithArrow>;
};

export default DownloadLink;
