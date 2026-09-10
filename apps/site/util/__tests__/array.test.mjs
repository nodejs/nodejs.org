import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { shuffle } from '#site/util/array';

describe('shuffle', () => {
  it('returns a permutation of the input without holes or undefined entries', async () => {
    // 20 entries, matching the length of the weighted partners list
    const input = Array.from({ length: 20 }, (_, i) => i);

    // Seed 5963280 is the real-world seed that broke the site build on
    // 2026-09-09 (run 34397952868): SHA-256('5963280')[(19 + 5963280) % 32]
    // is 255, which used to produce a swap index of `length` and inject
    // `undefined` into the shuffled array, crashing prerendering.
    const result = await shuffle(input, 5963280);

    assert.equal(result.length, input.length);
    assert.ok(result.every(entry => entry !== undefined));
    assert.deepEqual(
      [...result].sort((a, b) => a - b),
      input
    );
  });

  it('never swaps out of bounds for a range of seeds', async () => {
    const input = Array.from({ length: 20 }, (_, i) => `item-${i}`);

    for (let seed = 5963270; seed < 5963290; seed++) {
      const result = await shuffle(input, seed);

      assert.equal(result.length, input.length);
      assert.ok(result.every(entry => entry !== undefined));
      assert.deepEqual([...result].sort(), [...input].sort());
    }
  });

  it('returns the same order for identical seeds', async () => {
    const input = Array.from({ length: 20 }, (_, i) => i);

    assert.deepEqual(await shuffle(input, 42), await shuffle(input, 42));
    assert.notDeepEqual(await shuffle(input, 42), await shuffle(input, 43));
  });

  it('does not mutate the original array', async () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];

    await shuffle(input, 123);

    assert.deepEqual(input, copy);
  });

  it('handles empty and single-element arrays', async () => {
    assert.deepEqual(await shuffle([], 42), []);
    assert.deepEqual(await shuffle([1], 42), [1]);
  });
});
