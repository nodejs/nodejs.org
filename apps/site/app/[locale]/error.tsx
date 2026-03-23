'use client';

import { useTranslations } from 'next-intl';

import Button from '#site/components/Common/Button';
import GlowingBackdropLayout from '#site/layouts/GlowingBackdrop';
import { SHOW_ERROR_DETAILS } from '#site/next.constants.mjs';

import type { FC } from 'react';

type ErrorPageProps = {
  error: Error & { digest?: string };
};

const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  const t = useTranslations();
  const hasErrorDetails = Boolean(error.message || error.digest);

  return (
    <GlowingBackdropLayout kind="default">
      <span>500</span>

      <h1 className="special -mt-4 text-center">
        {t('layouts.error.internalServerError.title')}
      </h1>

      <p className="-mt-4 max-w-sm text-center text-lg">
        {t('layouts.error.internalServerError.description')}
      </p>

      {SHOW_ERROR_DETAILS && hasErrorDetails && (
        <details className="max-w-2xl rounded-lg border border-neutral-300 bg-neutral-950/90 px-4 py-3 text-left text-neutral-50">
          <summary className="cursor-pointer font-medium">
            {t('layouts.error.details')}
          </summary>

          <pre className="mt-3 overflow-x-auto font-mono text-xs leading-6 break-words whitespace-pre-wrap">
            {error.message}
            {error.digest
              ? `${error.message ? '\n' : ''}digest: ${error.digest}`
              : ''}
          </pre>
        </details>
      )}

      <Button href="/">{t('layouts.error.backToHome')}</Button>
    </GlowingBackdropLayout>
  );
};

export default ErrorPage;
