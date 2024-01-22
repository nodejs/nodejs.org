import { Highlight } from '@orama/highlight';
import { OramaClient } from '@oramacloud/client';

import { DEFAULT_ORAMA_QUERY_PARAMS } from './next.constants.mjs';

export const orama = new OramaClient({
  endpoint: process.env.NEXT_PUBLIC_ORAMA_ENDPOINT,
  api_key: process.env.NEXT_PUBLIC_ORAMA_API_KEY,
});

orama.startHeartBeat({ frequency: 3500 });

export const highlighter = new Highlight({
  CSSClass: 'font-bold',
  HTMLTag: 'span',
});

export async function getInitialFacets() {
  return await orama.search({
    term: '',
    ...DEFAULT_ORAMA_QUERY_PARAMS,
  });
}
