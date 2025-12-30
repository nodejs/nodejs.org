import { availableLocales, defaultLocale } from '@node-core/website-i18n';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import classNames from 'classnames';
import { NextIntlClientProvider } from 'next-intl';

import BaseLayout from '#site/layouts/Base';
import { VERCEL_ENV } from '#site/next.constants.mjs';
import { IBM_PLEX_MONO, OPEN_SANS } from '#site/next.fonts';
import { ThemeProvider } from '#site/providers/themeProvider';

import type { FC, PropsWithChildren } from 'react';

import '#site/styles/index.css';

const fontClasses = classNames(IBM_PLEX_MONO.variable, OPEN_SANS.variable);

type RootLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

const RootLayout: FC<RootLayoutProps> = async ({ children, params }) => {
  const { locale } = await params;

  const { langDir, hrefLang } =
    availableLocales.find(l => l.code === locale) || defaultLocale;

  return (
    <html
      className={fontClasses}
      dir={langDir}
      lang={hrefLang}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <ThemeProvider>
            <BaseLayout>{children}</BaseLayout>
          </ThemeProvider>
        </NextIntlClientProvider>

        <a
          rel="me"
          aria-hidden="true"
          className="hidden"
          href="https://social.lfx.dev/@nodejs"
        />

        {VERCEL_ENV && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
