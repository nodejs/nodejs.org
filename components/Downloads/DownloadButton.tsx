'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
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
        className="hidden flex-row items-center gap-2 dark:flex"
      >
        {children}

        <ArrowRightIcon className="h-[20px] w-[20px] dark:opacity-50" />
      </Button>

      <Button
        variant="primary"
        onClick={onDownloadNode}
        className="flex flex-row items-center gap-2 dark:hidden"
      >
        {children}

        <ArrowRightIcon className="h-[20px] w-[20px] dark:opacity-50" />
      </Button>
    </>
  );
};

export default DownloadButton;
