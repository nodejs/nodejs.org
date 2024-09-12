'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { captureException } from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import HomeLayout from '@/layouts/Home';

const ErrorPage: FC<{ error: Error }> = ({ error }) => {
  captureException(error);
  const t = useTranslations();

  return (
    <HomeLayout>
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
    </HomeLayout>
  );
};

export default ErrorPage;
