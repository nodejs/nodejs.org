import type { FC, PropsWithChildren } from 'react';

import { getClientContext } from '#site/client-context';
import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import type { DownloadKind, NodeRelease } from '#site/types';
import { getNodeDownloadUrl } from '#site/util/url';
import { getUserPlatform } from '#site/util/userAgent';

type DownloadLinkProps = { release: NodeRelease; kind?: DownloadKind };

const DownloadLink: FC<PropsWithChildren<DownloadLinkProps>> = ({
  release: { versionWithPrefix },
  kind = 'installer',
  children,
}) => {
  const { os, bitness, architecture } = getClientContext();

  const platform = getUserPlatform(architecture, bitness);

  const downloadLink = getNodeDownloadUrl({
    versionWithPrefix,
    os,
    platform,
    kind,
  });

  return <LinkWithArrow href={downloadLink}>{children}</LinkWithArrow>;
};

export default DownloadLink;
