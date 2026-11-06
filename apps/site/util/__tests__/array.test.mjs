import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { shuffle } from '#site/util/array';

const range = length => Array.from({ length }, (_, i) => i);

const sorted = array => [...array].sort((a, b) => a - b);

describe('shuffle', () => {
  it('returns the same order for the same seed', async () => {
    const input = range(20);

    assert.deepEqual(await shuffle(input, 42), await shuffle(input, 42));
  });

  it('does not mutate the input', async () => {
    const input = range(20);

    await shuffle(input, 42);

    assert.deepEqual(input, range(20));
  });

  // In these seeds, the first hash byte that the shuffle reads is 255
  for (const seed of [5963280, 5979951]) {
    it(`keeps every entry when the hash byte is 255 (seed ${seed})`, async () => {
      const input = range(20);

      assert.deepEqual(sorted(await shuffle(input, seed)), input);
    });
  }

  // About 1 in 256 seeds has a 255 byte at any given position, so this range
  // covers that case for each length without relying on hand-picked seeds
  for (const length of [2, 3, 20, 32, 33, 100]) {
    it(`returns a permutation of ${length} entries for any seed`, async () => {
      const input = range(length);

      for (let seed = 5979000; seed < 5981000; seed++) {
        assert.deepEqual(sorted(await shuffle(input, seed)), input);
      }
    });
  }
});
