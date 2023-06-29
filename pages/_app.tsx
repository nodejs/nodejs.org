import { Analytics } from '@vercel/analytics/react';
import { sourceSans } from '../util/nextFonts';
import BaseApp, { setAppFonts } from '../next.app';
import type { AppProps } from 'next/app';

import '../styles/old/index.scss';

setAppFonts([sourceSans.style.fontFamily]);

const App = ({ Component, pageProps }: AppProps) => (
  <BaseApp>
    <Component {...pageProps} />
    <Analytics />
  </BaseApp>
);

export default App;
