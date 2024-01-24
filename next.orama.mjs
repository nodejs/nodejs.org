import { Highlight } from '@orama/highlight';
import { OramaClient } from '@oramacloud/client';

import {
  DEFAULT_ORAMA_QUERY_PARAMS,
  ORAMA_CLOUD_HEARTBEAT_INTERVAL,
  ORAMA_CLOUD_ENDPOINT,
  ORAMA_CLOUD_API_KEY,
} from './next.constants.mjs';

export const orama = new OramaClient({
  endpoint: ORAMA_CLOUD_ENDPOINT,
  api_key: ORAMA_CLOUD_API_KEY,
});

orama.startHeartBeat({ frequency: ORAMA_CLOUD_HEARTBEAT_INTERVAL });

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
