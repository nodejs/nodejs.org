import { Analytics } from '@vercel/analytics/react';
import { Source_Sans_3 } from 'next/font/google';
import { useLocale } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import BaseLayout from '@/layouts/BaseLayout';
import { VERCEL_ENV } from '@/next.constants.mjs';
import { availableLocalesMap, defaultLocale } from '@/next.locales.mjs';
import { LocaleProvider } from '@/providers/localeProvider';
import { ThemeProvider } from '@/providers/themeProvider';

import '@/styles/old/index.css';

const sourceSans = Source_Sans_3({
  weight: ['400', '600'],
  display: 'fallback',
  subsets: ['latin'],
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const locale = useLocale();

  const { langDir, hrefLang } = availableLocalesMap[locale] || defaultLocale;

  return (
    <html className={sourceSans.className} dir={langDir} lang={hrefLang}>
      <body suppressHydrationWarning>
        <LocaleProvider>
          <ThemeProvider>
            <BaseLayout>{children}</BaseLayout>
          </ThemeProvider>
        </LocaleProvider>

        {VERCEL_ENV && <Analytics />}

        <a rel="me" href="https://social.lfx.dev/@nodejs" />
      </body>
    </html>
  );
};

export default RootLayout;
