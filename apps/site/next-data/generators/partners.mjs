import { partners } from '#site/next.json.mjs';
import { shuffle } from '#site/util/array';

/**
 * Provides the weighted and shuffled partners array.
 * Results are cached using React's cache directive.
 */
const generatePartners = async () => {
  // For weight sorting, use cached weighted partners
  const seconds = 300; // Change every 5 minutes
  const seed = Math.floor(Date.now() / (seconds * 1000));

  // Create weighted array (duplicates based on weight)
  const weightedPartners = partners.flatMap(partner => {
    const weight = partner.weight ?? 0;
    return Array(weight > 0 ? weight : 1).fill(partner);
  });

  // Shuffle and remove duplicates
  const shuffled = await shuffle(weightedPartners, seed);

  return Array.from(new Set(shuffled));
};

export default generatePartners;
