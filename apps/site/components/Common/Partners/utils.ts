import crypto from 'node:crypto';

import type {
  RandomPartnerListConfig,
  Partners,
} from '#site/types/partners.js';

function randomPartnerList(
  partners: Array<Partners>,
  config: RandomPartnerListConfig
) {
  const { pick = 4, dateSeed = 5, category } = config;

  // Generate a deterministic seed based on current time that changes every X minutes
  const seed = Math.floor(Date.now() / (dateSeed * 60 * 1000));

  // Filter by category if provided
  const filtered = category
    ? partners.filter(p => p.categories.includes(category))
    : partners;

  // Create a hash from the seed to use for consistent randomization
  const hash = crypto.createHash('sha256').update(String(seed)).digest();

  // Sort partners using the hash to ensure same results for the same seed
  const sorted = filtered.sort(
    (a, b) => hash[a.name.charCodeAt(0) % 32] - hash[b.name.charCodeAt(0) % 32]
  );

  return sorted.slice(0, pick ?? sorted.length);
}

export { randomPartnerList };
