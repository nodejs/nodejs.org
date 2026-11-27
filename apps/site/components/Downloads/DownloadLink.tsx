import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import { getNodeDownloadUrl } from '#site/util/url';

import type { DownloadKind, NodeRelease } from '#site/types';
import type { FC, PropsWithChildren } from 'react';

type DownloadLinkProps = { release: NodeRelease; kind?: DownloadKind };

const DownloadLink: FC<PropsWithChildren<DownloadLinkProps>> = ({
  release: { versionWithPrefix },
  kind = 'installer',
  children,
}) => {
  const downloadLink = getNodeDownloadUrl({ versionWithPrefix, kind });

  return <LinkWithArrow href={downloadLink}>{children}</LinkWithArrow>;
};

export default DownloadLink;
