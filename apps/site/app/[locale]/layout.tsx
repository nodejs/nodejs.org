/* eslint-disable @eslint-react/dom-no-dangerously-set-innerhtml -- The script is static; banner data is escaped in data attributes. */

import { availableLocales, defaultLocale } from '@node-core/website-i18n';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import classNames from 'classnames';
import { NextIntlClientProvider } from 'next-intl';

import BaseLayout from '#site/layouts/Base';
import { VERCEL_ENV } from '#site/next.constants.mjs';
import { IBM_PLEX_MONO, OPEN_SANS } from '#site/next.fonts';
import { siteConfig } from '#site/next.json.mjs';
import { ThemeProvider } from '#site/providers/themeProvider';
import { BANNER_DISMISSAL_STORAGE_KEY } from '#site/util/banner';

import type { FC, PropsWithChildren } from 'react';

import '#site/styles/index.css';

const fontClasses = classNames(IBM_PLEX_MONO.variable, OPEN_SANS.variable);

const banner = siteConfig.websiteBanners.index;

const bannerPreHydrationScript = `try{var s=document.currentScript;if(s&&localStorage.getItem(s.dataset.storageKey)===s.dataset.banner){document.documentElement.dataset.bannerDismissed='true'}}catch{}`;

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
      <head>
        {banner && (
          <script
            data-banner={banner.text}
            data-storage-key={BANNER_DISMISSAL_STORAGE_KEY}
            dangerouslySetInnerHTML={{ __html: bannerPreHydrationScript }}
          />
        )}
      </head>
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
