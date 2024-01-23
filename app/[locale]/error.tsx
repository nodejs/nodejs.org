'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { captureException } from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useMemo } from 'react';

import Button from '@/components/Common/Button';
import CenteredLayout from '@/layouts/New/Centered';
import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';

/** @deprecated remove legacy component when website redesign is done */
const LegacyErrorPage: FC<{ error: Error }> = ({ error }) => {
  useMemo(() => captureException(error), [error]);

  return (
    <div className="container">
      <h2>500: Internal Server Error</h2>
      <h3>This Page has thrown a non-recoverable Error</h3>
    </div>
  );
};

const ErrorPage: FC<{ error: Error }> = ({ error }) => {
  captureException(error);
  const t = useTranslations();

  return (
    <CenteredLayout>
      <div className="glowingBackdrop" />

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

export default ENABLE_WEBSITE_REDESIGN ? ErrorPage : LegacyErrorPage;
