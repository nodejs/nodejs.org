import React from 'react';
import Script from 'next/script';
import { Html, Head, Main, NextScript } from 'next/document';

// current application base path (temporary workaround)
const basePath = process.env.NEXT_BASE_PATH || '';

// @TODO: The custom scripts should be removed in the future when switching over `nodejs/nodejs.dev` codebase
// Note.: Some of these scripts will also be completely removed from the codebase such as jQuery
const Document = () => (
  <Html>
    <Head />
    <body>
      <Main />
      <NextScript />
      <Script
        strategy="beforeInteractive"
        src={`${basePath}/static/js/legacyMain.js`}
      />
      <a rel="me" href="https://social.lfx.dev/@nodejs" />
    </body>
  </Html>
);

export default Document;
