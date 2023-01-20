import { Source_Sans_Pro } from '@next/font/google';
import type { AppProps as DefaultAppProps } from 'next/app';
import type { ReactNode } from 'react';

import { NodeDataProvider } from '../providers/nodeDataProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { SiteProvider } from '../providers/siteProvider';

import type { AppProps } from '../types';

// TODO: These styles are temporary as we're going to move towards the CSS modules from `nodejs/nodejs.dev`
import '../styles/styles.scss';

type NextraAppProps = DefaultAppProps<AppProps>;

type NextraProps = NextraAppProps & {
  Component: NextraAppProps['Component'] & {
    // eslint-disable-next-line no-unused-vars
    getLayout: (page: ReactNode) => ReactNode;
  };
};

const sourceSansPro = Source_Sans_Pro({
  weight: ['400', '600'],
  display: 'fallback',
  subsets: ['latin'],
});

const Nextra = ({ Component, pageProps }: NextraProps) => (
  <SiteProvider>
    <LocaleProvider i18nData={pageProps.i18nData}>
      <NodeDataProvider nodeVersionData={pageProps.nodeVersionData}>
        {/* @TODO: This is a temporary solution. We might want to adopt Emotion/StyledComponents here */}
        <style jsx global>
          {`
            body {
              font: 400 20px/1.5 ${sourceSansPro.style.fontFamily}, 'Open Sans',
                Roboto, 'San Francisco', Helvetica, Arial, sans-serif;
            }
          `}
        </style>
        <Component {...pageProps} />
      </NodeDataProvider>
    </LocaleProvider>
  </SiteProvider>
);

export default Nextra;
