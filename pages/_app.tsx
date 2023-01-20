import { Source_Sans_Pro } from '@next/font/google';
import type { AppProps as DefaultAppProps } from 'next/app';
import type { ReactNode } from 'react';

import { NodeDataProvider } from '../providers/nodeDataProvider';
import { LocaleProvider } from '../providers/localeProvider';
import { SiteProvider } from '../providers/siteProvider';

import type { AppProps, LocaleConfig } from '../types';

// TODO: We already import on the `getStaticProps` side, but some routes do not get the `getStaticProps` hence we need to fallback data here
// might be a good opportunity to once we change to the code from `nodejs/nodejs.dev` to have an unified place for i18n stuff.
import i18nConfig from '../i18n/config.json';
import defaultI18nMessages from '../i18n/locales/en.json';

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
});

const defaultLanguage = i18nConfig.find(c => c.code === 'en');

const getI18nProviderProps = (pageProps: AppProps) => {
  const currentLocale = pageProps.currentLocale || defaultLanguage;
  const localeMessages = pageProps.localeMessages || defaultI18nMessages;
  const availableLocales = i18nConfig as LocaleConfig[];

  return { currentLocale, localeMessages, availableLocales };
};

const Nextra = ({ Component, pageProps }: NextraProps) => (
  <SiteProvider>
    <LocaleProvider {...getI18nProviderProps(pageProps)}>
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
