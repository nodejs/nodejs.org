declare global {
  // @TODO: Update this to use the correct type
  // eslint-disable-next-line no-unused-vars
  var __nextra_pageContext__: Record<string, any>;
}

export default global;

declare module 'node-version-data' {
  import type { NodeVersionData } from './types';

  export default function nodeVersionData(
    // eslint-disable-next-line no-unused-vars
    callback: (err: Error | null, data: NodeVersionData) => void
  ): void;
}
