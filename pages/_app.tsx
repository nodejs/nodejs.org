import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import { Source_Sans_Pro } from '@next/font/google';

import { LocalProvider } from '../providers/localeProvider';
import { SiteProvider } from '../providers/siteProvider';

// TODO: These styles are temporary as we're going to move towards the CSS modules from `nodejs/nodejs.dev`
import '../styles/styles.scss';

type NextraAppProps = AppProps & {
  Component: AppProps['Component'] & {
    // eslint-disable-next-line no-unused-vars
    getLayout: (page: ReactNode) => ReactNode;
  };
};

const sourceSansPro = Source_Sans_Pro({
  weight: ['400', '600'],
  display: 'fallback',
});

const Nextra = ({ Component, pageProps }: NextraAppProps) => (
  <SiteProvider>
    <LocalProvider>
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
    </LocalProvider>
  </SiteProvider>
);

export default Nextra;
