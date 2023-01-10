import React from 'react';
import Script from 'next/script';
import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentProps } from 'next/document';

// eslint-disable-next-line no-unused-vars
const Document = (props: DocumentProps) => (
  <Html>
    <Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/a11y-dark.min.css"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
      {/* @TODO: This should be removed in the future when switching over `nodejs/nodejs.dev` codebase */}
      <Script strategy="beforeInteractive" src="/static/js/themeSwitcher.js" />
      <Script strategy="lazyOnload" src="/static/js/main.js" />
    </body>
  </Html>
);

export default Document;
