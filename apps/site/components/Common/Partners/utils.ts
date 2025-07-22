import type { PartnerCategory, Partners } from '#site/types/partners.js';

// TODO: Implement no random list
// TODO: Implement no limit items
function randomPartnerList(
  partners: Array<Partners>,
  pick = 4,
  dateSeed = 5,
  category?: PartnerCategory
) {
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

  // Create a copy of the array to avoid modifying the original
  const shuffled = partners
    .filter(partner => !category || partner.categories.includes(category))
    .slice()
    .sort(() => rng() - 0.5);

  return shuffled.slice(0, pick);
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
