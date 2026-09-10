// Fisher-Yates shuffle algorithm with a seed for deterministic results
export const shuffle = async <T>(
  array: Array<T>,
  seed: number
): Promise<Array<T>> => {
  const shuffled = [...array];
  const encoder = new TextEncoder();
  const buffer = encoder.encode(String(seed));
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hash = new Uint8Array(hashBuffer);

  for (let i = shuffled.length - 1; i > 0; i--) {
    // Use hash bytes to generate deterministic "random" index
    const hashIndex = (i + seed) % 32;
    // Normalize to [0, 1): dividing by 256 (not 255) keeps the value strictly
    // below 1, so the derived swap index can never exceed `i`
    const randomValue = hash[hashIndex] / 256;

    const j = Math.floor(randomValue * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
