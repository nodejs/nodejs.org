'use client';

import type { FC, PropsWithChildren } from 'react';

import LinkWithArrow from '#site/components/LinkWithArrow';
import { useClientContext } from '#site/hooks';
import type { DownloadKind, NodeRelease } from '#site/types';
import { getNodeDownloadUrl } from '#site/util/url';
import { getUserPlatform } from '#site/util/userAgent';

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
