'use client';

import { captureException } from '@sentry/nextjs';
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
  useMemo(() => captureException(error), [error]);

  return (
    <CenteredLayout>
      <div className="glowingBackdrop" />

      <main>
        500
        <h1 className="special -mt-4">Internal Server Error</h1>
        <p className="-mt-4 max-w-sm text-center text-lg">
          This page has thrown a non-recoverable error.
        </p>
        <Button href="/">Back to Home</Button>
      </main>
    </CenteredLayout>
  );
};

export default ENABLE_WEBSITE_REDESIGN ? ErrorPage : LegacyErrorPage;
