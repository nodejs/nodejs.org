import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

import { SiteProvider } from '../providers/siteProvider';

// TODO: These styles are temporary as we're going to move towards the CSS modules from `nodejs/nodejs.dev`
import '../styles/styles.scss';

type NextraAppProps = AppProps & {
  Component: AppProps['Component'] & {
    // eslint-disable-next-line no-unused-vars
    getLayout: (page: ReactNode) => ReactNode;
  };
};

const Nextra = ({ Component, pageProps }: NextraAppProps) => (
  <SiteProvider>
    <Component {...pageProps} />
  </SiteProvider>
);

export default Nextra;
