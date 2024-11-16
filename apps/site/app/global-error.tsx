'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import BaseLayout from '@/layouts/Base';
import GlowingBackdropLayout from '@/layouts/GlowingBackdrop';

const GlobalErrorPage: FC<{ error: Error }> = () => (
  <html>
    <body>
      <BaseLayout>
        <GlowingBackdropLayout>
          500
          <h1 className="special -mt-4 text-center">Internal Server Error</h1>
          <p className="-mt-4 max-w-sm text-center text-lg">
            This page has thrown a non-recoverable error.
          </p>
          <Button href="/">
            Back to Home
            <ArrowRightIcon />
          </Button>
        </GlowingBackdropLayout>
      </BaseLayout>
    </body>
  </html>
);

export default GlobalErrorPage;
