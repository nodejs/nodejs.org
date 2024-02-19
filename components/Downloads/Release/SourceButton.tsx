'use client';

import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import { useReleaseContext } from '@/providers/releaseProvider';

const SourceButton: FC = () => {
  const t = useTranslations();
  const {
    state: { version },
  } = useReleaseContext();

  const url = `https://nodejs.org/dist/${version}/node-${version}.tar.gz`;

  return (
    <div className="mb-2 mt-6 flex items-center gap-2">
      <Button href={url} disabled={!version}>
        <CloudArrowDownIcon />
        {t('layouts.download.buttons.source', {
          version: version,
        })}
      </Button>
    </div>
  );
};

export default SourceButton;
