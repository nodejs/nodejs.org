'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import { useReleaseContext } from '@/providers/releaseProvider';
import { downloadUrlByOS } from '@/util/downloadUrlByOS';
import { OperatingSystem } from '@/util/downloadUtils';

const DownloadButton: FC = () => {
  const t = useTranslations();
  const {
    state: { version, os, bitness },
  } = useReleaseContext();

  const url = downloadUrlByOS(version, os, bitness);

  return (
    <div className="mb-2 mt-6 flex items-center gap-2">
      <Button href={url} disabled={!version}>
        {t('layouts.download.buttons.prebuilt', {
          version,
          os: OperatingSystem[os],
        })}
      </Button>
    </div>
  );
};

export default DownloadButton;
