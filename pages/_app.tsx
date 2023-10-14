import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { Source_Sans_3 } from 'next/font/google';

import { VERCEL_ENV } from '@/next.constants.mjs';
import { BlogDataProvider } from '@/providers/blogDataProvider';
import { LocaleProvider } from '@/providers/localeProvider';
import { NodeReleasesProvider } from '@/providers/nodeReleasesProvider';
import { SiteProvider } from '@/providers/siteProvider';
import { ThemeProvider } from '@/providers/themeProvider';

import '@/styles/old/index.css';

const sourceSans = Source_Sans_3({
  weight: ['400', '600'],
  display: 'fallback',
  subsets: ['latin'],
});

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <ThemeProvider>
      <LocaleProvider>
        <SiteProvider>
          <NodeReleasesProvider>
            <BlogDataProvider>
              <Component {...pageProps} />
            </BlogDataProvider>
          </NodeReleasesProvider>
        </SiteProvider>
      </LocaleProvider>
    </ThemeProvider>

    {VERCEL_ENV && <Analytics />}

    <style jsx global>
      {`
        body {
          font-family: ${sourceSans.style.fontFamily};
        }
      `}
    </style>
  </>
);

export default App;
