'use client';

import { captureException } from '@sentry/nextjs';
import type { FC } from 'react';
import { useMemo } from 'react';

const ErrorPage: FC<{ error: Error }> = ({ error }) => {
  useMemo(() => captureException(error), [error]);

  return (
    <div className="container">
      <h2>500: Internal Server Error</h2>
      <h3>This Page has thrown a non-recoverable Error</h3>
    </div>
  );
};

export default ErrorPage;
