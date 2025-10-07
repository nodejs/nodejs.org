import type { RandomPartnerListConfig, Partners } from '#site/types';
import { shuffle } from '#site/util/array';

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
