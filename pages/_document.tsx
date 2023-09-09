import Script from 'next/script';
import { Html, Head, Main, NextScript } from 'next/document';
import { LEGACY_JAVASCRIPT_FILE } from '@/next.constants.mjs';
import type { DocumentProps } from 'next/document';

const Document = ({ __NEXT_DATA__ }: DocumentProps) => (
  <Html lang={__NEXT_DATA__.query.path ? __NEXT_DATA__.query.path[0] : 'en'}>
    <Head />
    <body>
      <Main />
      <NextScript />

      <Script strategy="beforeInteractive" src={LEGACY_JAVASCRIPT_FILE} />

      <a rel="me" href="https://social.lfx.dev/@nodejs" />
    </body>
  </Html>
);

export default Document;
