'use client';

import { NextIntlClientProvider } from 'next-intl';
import type { FC } from 'react';

import Button from '#site/components/Common/Button';
import BaseLayout from '#site/layouts/Base';
import GlowingBackdropLayout from '#site/layouts/GlowingBackdrop';
import { ThemeProvider } from '#site/providers/themeProvider';

const GlobalErrorPage: FC<{ error: Error }> = () => (
  <html>
    <body>
      <NextIntlClientProvider>
        <ThemeProvider>
          <BaseLayout>
            <GlowingBackdropLayout>
              <span>500</span>

              <h1 className="special -mt-4 text-center">
                Internal Server Error
              </h1>

              <p className="-mt-4 max-w-sm text-center text-lg">
                This page has thrown a non-recoverable error.
              </p>

              <Button href="/">Back to Home</Button>
            </GlowingBackdropLayout>
          </BaseLayout>
        </ThemeProvider>
      </NextIntlClientProvider>
    </body>
  </html>
);

export default GlobalErrorPage;
