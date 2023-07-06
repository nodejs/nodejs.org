import { Analytics } from '@vercel/analytics/react';
import { SiteProvider } from '../providers/siteProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { BlogDataProvider } from '../providers/blogDataProvider';
import { NodeReleasesProvider } from '../providers/nodeReleasesProvider';
import { sourceSans } from '../util/nextFonts';
import * as nextConstants from '../next.constants.mjs';
import type { AppProps } from 'next/app';

import '../styles/old/index.scss';

// The Vercel Analytics component should only be rendered if the current App is
// deployed within Vercel Infrastructure. Otherwise we don't need to render this component.
const renderVercelAnalytics = nextConstants.VERCEL_DEPLOYED && <Analytics />;

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

    {renderVercelAnalytics}

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
