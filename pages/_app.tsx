import { Source_Sans_3 } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SiteProvider } from '@/providers/siteProvider';
import { LocaleProvider } from '@/providers/localeProvider';
import { BlogDataProvider } from '@/providers/blogDataProvider';
import { NodeReleasesProvider } from '@/providers/nodeReleasesProvider';
import { VERCEL_ENV } from '@/next.constants.mjs';
import type { AppProps } from 'next/app';

import '@/styles/old/index.css';

const sourceSans = Source_Sans_3({
  weight: ['400', '600'],
  display: 'fallback',
  subsets: ['latin'],
});

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <LocaleProvider>
      <SiteProvider>
        <NodeReleasesProvider>
          <BlogDataProvider>
            <Component {...pageProps} />
          </BlogDataProvider>
        </NodeReleasesProvider>
      </SiteProvider>
    </LocaleProvider>

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
