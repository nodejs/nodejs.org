'use client';

import { captureException } from '@sentry/nextjs';
import ErrorComponent from 'next/error';
import type { FC } from 'react';
import { useMemo } from 'react';

const GlobalErrorPage: FC<{ error: Error }> = ({ error }) => {
  useMemo(() => captureException(error), [error]);

  return (
    <html>
      <body>
        <ErrorComponent statusCode={500} />
      </body>
    </html>
  );
};

export default GlobalErrorPage;
