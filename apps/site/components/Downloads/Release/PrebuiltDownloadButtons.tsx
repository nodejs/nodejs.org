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

const PrebuiltDownloadButtons: FC = () => {
  const t = useTranslations();
  const { release, os, platform } = useContext(ReleaseContext);

  const { installerUrl, installerExt, binaryUrl, binaryExt } = useMemo(() => {
    const installerUrl = getNodeDownloadUrl(
      release.versionWithPrefix,
      os,
      platform || undefined,
      'installer'
    );

    const binaryUrl = getNodeDownloadUrl(
      release.versionWithPrefix,
      os,
      platform || undefined,
      'binary'
    );

    return {
      installerUrl,
      binaryUrl,
      installerExt: getExtension(installerUrl),
      binaryExt: getExtension(binaryUrl),
    };
  }, [os, platform, release.versionWithPrefix]);

  return (
    <div className="my-4 flex gap-2">
      <Skeleton loading={os === 'LOADING'}>
        <Button
          href={installerUrl}
          disabled={OS_NOT_SUPPORTING_INSTALLERS.includes(os)}
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

      <Skeleton loading={os === 'LOADING'}>
        <Button href={binaryUrl} size="small" className="min-w-56">
          <CloudArrowDownIcon />

          {t('layouts.download.buttons.binary', { extension: binaryExt })}
        </Button>
      </Skeleton>
    </div>
  );
};

export default PrebuiltDownloadButtons;
