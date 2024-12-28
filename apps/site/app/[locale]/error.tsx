'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import GlowingBackdropLayout from '@/layouts/GlowingBackdrop';

const ErrorPage: FC<{ error: Error }> = () => {
  const t = useTranslations();

  return (
    <GlowingBackdropLayout kind="default">
      500
      <h1 className="special -mt-4 text-center">
        {t('layouts.error.internalServerError.title')}
      </h1>
      <p className="-mt-4 max-w-sm text-center text-lg">
        {t('layouts.error.internalServerError.description')}
      </p>
      <Button href="/">
        {t('layouts.error.backToHome')}
        <ArrowRightIcon />
      </Button>
    </GlowingBackdropLayout>
  );
};

export default ErrorPage;
