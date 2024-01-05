'use client';

import type { FC, PropsWithChildren } from 'react';

import Button from '@/components/Common/Button';
import { useDetectOS } from '@/hooks';
import { useRouter } from '@/navigation.mjs';
import type { NodeRelease } from '@/types';
import { downloadUrlByOS } from '@/util/downloadUrlByOS';

type DownloadButtonProps = { release: NodeRelease };

const DownloadButton: FC<PropsWithChildren<DownloadButtonProps>> = ({
  release: { versionWithPrefix },
  children,
}) => {
  const { os, bitness } = useDetectOS();
  const { push } = useRouter();

  const nodeDownloadLink = downloadUrlByOS(versionWithPrefix, os, bitness);

  const onDownloadNode = () => push(nodeDownloadLink);

  return (
    <>
      <Button
        variant="special"
        onClick={onDownloadNode}
        className="hidden dark:block"
      >
        {children}
      </Button>

      <Button
        variant="primary"
        onClick={onDownloadNode}
        className="block dark:hidden"
      >
        {children}
      </Button>
    </>
  );
};

export default DownloadButton;
