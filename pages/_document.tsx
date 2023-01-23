import React from 'react';
import Script from 'next/script';
import { Html, Head, Main, NextScript } from 'next/document';

// @TODO: The custom scripts should be removed in the future when switching over `nodejs/nodejs.dev` codebase
// Note.: Some of these scripts will also be completely removed from the codebase such as jQuery
// eslint-disable-next-line react/function-component-definition
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script strategy="beforeInteractive" src="/static/js/legacyMain.js" />
      </body>
    </Html>
  );
}
