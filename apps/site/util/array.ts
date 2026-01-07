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
    // Normalize to 0-1
    const randomValue = hash[hashIndex] / 255;

    const j = Math.floor(randomValue * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
