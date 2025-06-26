'use client';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import Skeleton from '@node-core/ui-components/Common/Skeleton';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import type { FC } from 'react';

import Button from '#site/components/Common/Button';
import { ReleaseContext } from '#site/providers/releaseProvider';
import {
  OS_NOT_SUPPORTING_INSTALLERS,
  OperatingSystemLabel,
} from '#site/util/download';
import { getNodeDownloadUrl } from '#site/util/url';

// Retrieves the pure extension piece from the input string
const getExtension = (input: string) => String(input.split('.').slice(-1));

const PrebuiltDownloadButtons: FC = () => {
  const t = useTranslations();
  const { release, os, platform } = useContext(ReleaseContext);

  const installerUrl = platform
    ? getNodeDownloadUrl(release.versionWithPrefix, os, platform, 'installer')
    : '';

  const binaryUrl = platform
    ? getNodeDownloadUrl(release.versionWithPrefix, os, platform, 'binary')
    : '';

  return (
    <div className="my-4 flex flex-col gap-2 sm:flex-row">
      <Skeleton
        loading={os === 'LOADING' || platform === ''}
        hide={OS_NOT_SUPPORTING_INSTALLERS.includes(os)}
      >
        <Button
          href={installerUrl}
          size="small"
          className="w-full min-w-56 sm:w-auto"
        >
          <CloudArrowDownIcon />

          {t('layouts.download.buttons.installer', {
            os: OperatingSystemLabel[os],
            extension: getExtension(installerUrl),
          })}
        </Button>
      </Skeleton>

      <Skeleton loading={os === 'LOADING' || platform === ''}>
        <Button
          href={binaryUrl}
          size="small"
          className="w-full min-w-56 sm:w-auto"
        >
          <CloudArrowDownIcon />

          {t('layouts.download.buttons.binary', {
            extension: getExtension(binaryUrl),
          })}
        </Button>
      </Skeleton>
    </div>
  );
};

export default PrebuiltDownloadButtons;
