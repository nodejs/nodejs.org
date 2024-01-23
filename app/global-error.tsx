'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { captureException } from '@sentry/nextjs';
import ErrorComponent from 'next/error';
import type { FC } from 'react';
import { useMemo } from 'react';

import Button from '@/components/Common/Button';
import BaseLayout from '@/layouts/BaseLayout';
import CenteredLayout from '@/layouts/New/Centered';
import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';

/** @deprecated remove legacy component when website redesign is done */
const LegacyGlobalErrorPage: FC<{ error: Error }> = ({ error }) => {
  useMemo(() => captureException(error), [error]);

  return (
    <html>
      <body>
        <ErrorComponent statusCode={500} />
      </body>
    </html>
  );
};

const GlobalErrorPage: FC<{ error: Error }> = ({ error }) => {
  captureException(error);

  return (
    <html>
      <body>
        <BaseLayout>
          <CenteredLayout>
            <div className="glowingBackdrop" />

            <main>
              500
              <h1 className="special -mt-4">Internal Server Error</h1>
              <p className="-mt-4 max-w-sm text-center text-lg">
                This page has thrown a non-recoverable error.
              </p>
              <Button href="/">
                Back to Home
                <ArrowRightIcon />
              </Button>
            </main>
          </CenteredLayout>
        </BaseLayout>
      </body>
    </html>
  );
};

export default ENABLE_WEBSITE_REDESIGN
  ? GlobalErrorPage
  : LegacyGlobalErrorPage;
