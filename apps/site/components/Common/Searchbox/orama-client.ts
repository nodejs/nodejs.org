import { OramaCloud } from '@orama/core';

import {
  ORAMA_CLOUD_PROJECT_ID,
  ORAMA_CLOUD_READ_API_KEY,
} from '#site/next.constants.mjs';

export const oramaClient =
  ORAMA_CLOUD_PROJECT_ID && ORAMA_CLOUD_READ_API_KEY
    ? new OramaCloud({
        projectId: ORAMA_CLOUD_PROJECT_ID,
        apiKey: ORAMA_CLOUD_READ_API_KEY,
      })
    : null;
