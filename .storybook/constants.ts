import type { AppProps, NodeVersionData } from '../types';

const nodeVersionData: NodeVersionData[] = [
  {
    node: 'v19.8.1',
    nodeNumeric: '19.8.1',
    nodeMajor: 'v19.x',
    npm: '9.5.1',
    isLts: false,
  },
  {
    node: 'v18.15.0',
    nodeNumeric: '18.15.0',
    nodeMajor: 'v18.x',
    npm: '9.5.0',
    isLts: true,
  },
];

export const pageProps = { nodeVersionData };
