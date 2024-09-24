'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { captureException } from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import GlowingBackdrop from '@/components/Common/GlowingBackdrop';
import CenteredLayout from '@/layouts/Centered';

const ErrorPage: FC<{ error: Error }> = ({ error }) => {
  captureException(error);
  const t = useTranslations();

  return (
    <CenteredLayout>
      <GlowingBackdrop />

      <main>
        500
        <h1 className="special -mt-4">
          {t('layouts.error.internalServerError.title')}
        </h1>
        <p className="-mt-4 max-w-sm text-center text-lg">
          {t('layouts.error.internalServerError.description')}
        </p>
        <Button href="/">
          {t('layouts.error.backToHome')}
          <ArrowRightIcon />
        </Button>
      </main>
    </CenteredLayout>
  );
};

export default ErrorPage;
