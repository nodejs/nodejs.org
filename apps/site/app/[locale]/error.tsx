'use client';

import { useTranslations } from 'next-intl';

import Button from '#site/components/Common/Button';
import GlowingBackdropLayout from '#site/layouts/GlowingBackdrop';

import type { FC } from 'react';

type ErrorWithDigest = Error & { digest?: string };

const showErrorDetails =
  process.env.NODE_ENV !== 'production' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

const getErrorDetails = (error: ErrorWithDigest) =>
  [
    error.name && `Name: ${error.name}`,
    error.message && `Message: ${error.message}`,
    error.digest && `Digest: ${error.digest}`,
  ]
    .filter(Boolean)
    .join('\n');

const ErrorPage: FC<{ error: ErrorWithDigest }> = ({ error }) => {
  const t = useTranslations();
  const errorDetails = getErrorDetails(error);

  return (
    <GlowingBackdropLayout kind="default">
      <span>500</span>

      <h1 className="special -mt-4 text-center">
        {t('layouts.error.internalServerError.title')}
      </h1>

      <p className="-mt-4 max-w-sm text-center text-lg">
        {t('layouts.error.internalServerError.description')}
      </p>

      {showErrorDetails && errorDetails && (
        <pre className="max-w-2xl rounded-sm border border-neutral-200 bg-neutral-100 p-4 text-sm break-words whitespace-pre-wrap dark:border-neutral-900 dark:bg-neutral-950">
          {errorDetails}
        </pre>
      )}

      <Button href="/">{t('layouts.error.backToHome')}</Button>
    </GlowingBackdropLayout>
  );
};

export default ErrorPage;
