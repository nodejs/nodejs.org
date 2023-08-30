import { Analytics } from '@vercel/analytics/react';
import { SiteProvider } from '@/providers/siteProvider';
import { LocaleProvider } from '@/providers/localeProvider';
import { BlogDataProvider } from '@/providers/blogDataProvider';
import { NodeReleasesProvider } from '@/providers/nodeReleasesProvider';
import { sourceSans } from '@/util/nextFonts';
import { VERCEL_ENV } from '@/next.constants.mjs';
import type { AppProps } from 'next/app';

import '@/styles/old/index.scss';

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
