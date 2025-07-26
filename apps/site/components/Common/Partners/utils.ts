import type { PartnerCategory, Partners } from '#site/types/partners.js';

function randomPartnerList(
  partners: Array<Partners>,
  config: {
    /**
     * Number of partners to pick from the list.
     * If null, all partners will be returned.
     */
    pick?: number | null;
    /**
     * Date seed to use for the randomization.
     * This is used to ensure that the same partners are returned for the same date.
     */
    dateSeed?: number;
    /**
     * Category of partners to filter by.
     * If not provided, all partners will be returned.
     */
    category?: PartnerCategory;
    /**
     * Whether to randomize the partners or not.
     */
    sort?: 'name' | 'weight' | null;
  }
) {
  const { pick = 4, dateSeed = 5, category, sort = 'weight' } = config;

  const filteredPartners = [...partners].filter(partner => {
    return !category || partner.categories.includes(category);
  });

  if (sort === null) {
    return pick !== null ? filteredPartners.slice(0, pick) : filteredPartners;
  }

  if (sort === 'name') {
    const shuffled = [...filteredPartners].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return pick !== null ? shuffled.slice(0, pick) : shuffled;
  }

  const now = new Date();
  const minutes = Math.floor(now.getUTCMinutes() / dateSeed) * dateSeed;

  const fixedTime = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      minutes,
      0,
      0
    )
  );

  // We create a seed from the rounded date (timestamp in ms)
  const seed = fixedTime.getTime();
  const rng = mulberry32(seed);

  const weightedPartners = filteredPartners.flatMap(partner => {
    const weight = partner.weight;
    return Array(weight).fill(partner);
  });

  // Create a copy of the array to avoid modifying the original
  const shuffled = [...weightedPartners].sort(() => rng() - 0.5);

  // Remove duplicates while preserving order
  const unique = Array.from(new Set(shuffled));

  if (pick !== null) {
    return unique.slice(0, pick);
  }

  return unique;
}

// This function returns a random list of partners based on a fixed time seed
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export { randomPartnerList };
