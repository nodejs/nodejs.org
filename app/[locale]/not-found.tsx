'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import CenteredLayout from '@/layouts/Centered';

const NotFoundPage: FC = () => {
  const t = useTranslations();

  return (
    <CenteredLayout>
      <div className="glowingBackdrop" />

      <main>
        404
        <h1 className="special -mt-4">{t('layouts.error.notFound.title')}</h1>
        <p className="-mt-4 max-w-sm text-center text-lg">
          {t('layouts.error.notFound.description')}
        </p>
        <Button href="/">
          {t('layouts.error.backToHome')}
          <ArrowRightIcon />
        </Button>
      </main>
    </CenteredLayout>
  );
};

export default NotFoundPage;
