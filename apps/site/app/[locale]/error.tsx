'use client';

import { useTranslations } from 'next-intl';

import Button from '#site/components/Common/Button';
import GlowingBackdropLayout from '#site/layouts/GlowingBackdrop';

import type { FC } from 'react';

const ErrorPage: FC<{ error: Error }> = () => {
  const t = useTranslations();

  return (
    <GlowingBackdropLayout kind="default">
      <span>500</span>

      <h1 className="special -mt-4 text-center">
        {t('layouts.error.internalServerError.title')}
      </h1>

      <p className="-mt-4 max-w-sm text-center text-lg">
        {t('layouts.error.internalServerError.description')}
      </p>

      <Button href="/">{t('layouts.error.backToHome')}</Button>
    </GlowingBackdropLayout>
  );
};

export default ErrorPage;
