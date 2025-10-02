import crypto from 'node:crypto';

import type {
  RandomPartnerListConfig,
  Partners,
} from '#site/types/partners.js';

// Fisher-Yates shuffle algorithm with a seed for deterministic results
function shuffle(array: Array<Partners>, seed: number): Array<Partners> {
  const shuffled = [...array];
  const hash = crypto.createHash('sha256').update(String(seed)).digest();

  for (let i = shuffled.length - 1; i > 0; i--) {
    // Use hash bytes to generate deterministic "random" index
    const hashIndex = (i + seed) % 32;
    // Normalize to 0-1
    const randomValue = hash[hashIndex] / 255;

    const j = Math.floor(randomValue * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

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

  return shuffle(filtered, seed).slice(0, pick ?? filtered.length);
}

export { randomPartnerList };
