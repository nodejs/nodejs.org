'use client';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useContext, useMemo } from 'react';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import Skeleton from '@/components/Common/Skeleton';
import { ReleaseContext } from '@/providers/releaseProvider';
import {
  OperatingSystemLabel,
  OS_NOT_SUPPORTING_INSTALLERS,
} from '@/util/downloadUtils';
import { getNodeDownloadUrl } from '@/util/getNodeDownloadUrl';

// Retrieves the pure extension piece from the input string
const getExtension = (input: string) => String(input.split('.').slice(-1));

const DownloadButton: FC = () => {
  const t = useTranslations();
  const { release, os, bitness } = useContext(ReleaseContext);

  const version = release.versionWithPrefix;

  const { installerUrl, installerExt, binaryUrl, binaryExt } = useMemo(() => {
    const installerUrl = getNodeDownloadUrl(version, os, bitness, 'installer');
    const binaryUrl = getNodeDownloadUrl(version, os, bitness, 'binary');

    return {
      installerUrl,
      binaryUrl,
      installerExt: getExtension(installerUrl),
      binaryExt: getExtension(binaryUrl),
    };
  }, [version, os, bitness]);

  return (
    <div className="my-4 flex gap-2">
      {OS_NOT_SUPPORTING_INSTALLERS.includes(os) || (
        <Skeleton loading={os === 'LOADING'}>
          <Button
            href={installerUrl}
            disabled={!version}
            size="small"
            className="min-w-56"
          >
            <CloudArrowDownIcon />

            {t('layouts.download.buttons.installer', {
              os: OperatingSystemLabel[os],
              extension: installerExt,
            })}
          </Button>
        </Skeleton>
      )}

      <Skeleton loading={os === 'LOADING'}>
        <Button
          href={binaryUrl}
          disabled={!version}
          size="small"
          className="min-w-56"
        >
          <CloudArrowDownIcon />

          {t('layouts.download.buttons.binary', { extension: binaryExt })}
        </Button>
      </Skeleton>
    </div>
  );
};

export default DownloadButton;
