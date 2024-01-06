import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import classNames from 'classnames';
import { getLocale } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import LegacyBaseLayout from '@/layouts/BaseLayout';
import NewBaseLayout from '@/layouts/New/Base';
import { ENABLE_WEBSITE_REDESIGN, VERCEL_ENV } from '@/next.constants.mjs';
import { IBM_PLEX_MONO, OPEN_SANS, SOURCE_SANS } from '@/next.fonts';
import { availableLocalesMap, defaultLocale } from '@/next.locales.mjs';
import { LocaleProvider } from '@/providers/localeProvider';
import { ThemeProvider } from '@/providers/themeProvider';

// Uses a WebPack/TurboPack Alias for resolving Global Styles
// @deprecated remove when website redesign is done
// eslint-disable-next-line import/no-unresolved
import 'globalStyles';

// Defines the App Fonts based on being on Website Redesign or not
// @deprecated remove when website redesign is done
const fontClasses = classNames(IBM_PLEX_MONO.variable, {
  [SOURCE_SANS.className]: !ENABLE_WEBSITE_REDESIGN,
  [OPEN_SANS.variable]: ENABLE_WEBSITE_REDESIGN,
});

// Defines the Base Layout based on being on Website Redesign or not
// @deprecated remove when website redesign is done
const AppLayout = ENABLE_WEBSITE_REDESIGN ? NewBaseLayout : LegacyBaseLayout;

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const locale = await getLocale();

  const { langDir, hrefLang } = availableLocalesMap[locale] || defaultLocale;

  return (
    <html className={fontClasses} dir={langDir} lang={hrefLang}>
      <body suppressHydrationWarning>
        <LocaleProvider>
          <ThemeProvider>
            <AppLayout>{children}</AppLayout>
          </ThemeProvider>
        </LocaleProvider>

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
