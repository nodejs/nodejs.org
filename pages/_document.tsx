import React from 'react';
import Script from 'next/script';
import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentProps } from 'next/document';

// @TODO: The custom scripts should be removed in the future when switching over `nodejs/nodejs.dev` codebase
// Note.: Some of these scripts will also be completely removed from the codebase such as jQuery
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
      <Script strategy="beforeInteractive" src="/static/js/themeSwitcher.js" />
      <Script
        strategy="beforeInteractive"
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.slim.min.js"
      />
      <Script
        strategy="beforeInteractive"
        src="https://cdn.jsdelivr.net/npm/jquery.fancytable@1.0.33/dist/fancyTable.min.js"
      />
      <Script strategy="lazyOnload" src="/static/js/main.js" />
    </body>
  </Html>
);

export default Document;
