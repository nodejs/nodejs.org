import { Highlight } from '@orama/highlight';
import { OramaClient } from '@oramacloud/client';

import {
  DEFAULT_ORAMA_QUERY_PARAMS,
  ORAMA_CLOUD_HEARTBEAT_INTERVAL,
  ORAMA_CLOUD_ENDPOINT,
  ORAMA_CLOUD_API_KEY,
} from './next.constants.mjs';

// Provides a safe-wrapper that initialises the OramaClient
// based on the presence of environmental variables
const { search, getInitialFacets } = (() => {
  if (ORAMA_CLOUD_ENDPOINT && ORAMA_CLOUD_API_KEY) {
    const orama = new OramaClient({
      endpoint: ORAMA_CLOUD_ENDPOINT,
      api_key: ORAMA_CLOUD_API_KEY,
    });

    orama.startHeartBeat({ frequency: ORAMA_CLOUD_HEARTBEAT_INTERVAL });

    return {
      search: orama.search.bind(orama),
      getInitialFacets: async () =>
        orama.search({ term: '', ...DEFAULT_ORAMA_QUERY_PARAMS }).catch(),
    };
  }

  return { search: async () => null, getInitialFacets: async () => null };
})();

export { search, getInitialFacets };

export const highlighter = new Highlight({
  CSSClass: 'font-bold',
  HTMLTag: 'span',
});
