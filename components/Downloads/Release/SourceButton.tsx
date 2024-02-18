'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import { useReleaseContext } from '@/providers/releaseProvider';

const SourceButton: FC = () => {
  const {
    state: { version },
  } = useReleaseContext();
  const t = useTranslations();

  return (
    <div className="my-6 flex items-center gap-2">
      <Button
        href={`https://nodejs.org/dist/${version}/node-${version}.tar.gz`}
        disabled={!version}
      >
        {t('layouts.download.buttons.source', {
          version: version,
        })}
      </Button>
    </div>
  );
};

export default SourceButton;
