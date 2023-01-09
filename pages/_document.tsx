import React from 'react';
import Script from 'next/script';
import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentProps } from 'next/document';

// eslint-disable-next-line no-unused-vars
const Document = (props: DocumentProps) => (
  <Html>
    <Head />
    <body>
      <Main />
      <NextScript />
      {/* @TODO: This should be removed in the future when switching over `nodejs/nodejs.dev` codebase */}
      <Script src="/static/js/themeSwitcher.js"></Script>
    </body>
  </Html>
);

export default Document;
