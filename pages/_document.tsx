import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentProps } from 'next/document';

// eslint-disable-next-line no-unused-vars
const Document = (props: DocumentProps) => (
  <Html>
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
