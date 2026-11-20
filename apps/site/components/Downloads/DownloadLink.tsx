import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import { getNodeDownloadUrl } from '#site/util/url';

import type { DownloadKind, NodeRelease } from '#site/types';
import type { DownloadOptions } from '#site/util/url';
import type { FC, PropsWithChildren } from 'react';

type DownloadLinkProps = { release: NodeRelease; kind?: DownloadKind } & Pick<
  DownloadOptions,
  'os' | 'platform'
>;

const DownloadLink: FC<PropsWithChildren<DownloadLinkProps>> = ({
  release: { versionWithPrefix },
  kind = 'installer',
  os,
  platform,
  children,
}) => {
  const downloadLink = getNodeDownloadUrl({
    versionWithPrefix,
    os,
    platform,
    kind,
  });

  return <LinkWithArrow href={downloadLink}>{children}</LinkWithArrow>;
};

export default DownloadLink;
