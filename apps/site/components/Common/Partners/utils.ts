import type {
  RandomPartnerListConfig,
  Partners,
} from '#site/types/partners.js';

// Fisher-Yates shuffle algorithm with a seed for deterministic results
async function shuffle(
  array: Array<Partners>,
  seed: number
): Promise<Array<Partners>> {
  const shuffled = [...array];
  const encoder = new TextEncoder();
  const buffer = encoder.encode(String(seed));
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hash = new Uint8Array(hashBuffer);

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

async function randomPartnerList(
  partners: Array<Partners>,
  config: RandomPartnerListConfig
): Promise<Array<Partners>> {
  const { pick = 4, dateSeed = 5, category } = config;

  // Generate a deterministic seed based on current time that changes every X minutes
  const seed = Math.floor(Date.now() / (dateSeed * 60 * 1000));

  // Filter by category if provided
  const filtered = category
    ? partners.filter(p => p.categories.includes(category))
    : partners;

  const shuffled = await shuffle(filtered, seed);

  return shuffled.slice(0, pick ?? filtered.length);
}

export { randomPartnerList };
