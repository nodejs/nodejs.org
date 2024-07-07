import type { Result } from '@orama/orama';

import { BASE_URL } from '@/next.constants.mjs';
import type { SearchDoc } from '@/types';

export const searchHitToLinkPath = (hit: Result<SearchDoc>) => {
  const isAPIResult = hit.document.siteSection.toLowerCase() === 'docs';
  const basePath = isAPIResult ? BASE_URL : '';
  return `${basePath}/${hit.document.path}`;
};
