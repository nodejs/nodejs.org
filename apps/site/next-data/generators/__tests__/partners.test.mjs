import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// The shuffle reads a different hash byte depending on the size of the weighted
// list, so these timestamps only apply to a list of exactly 20 entries. This
// fixture keeps them meaningful when the real partner list changes.
const PARTNERS = [
  { id: 'A', weight: 3 },
  { id: 'B', weight: 2 },
  { id: 'C', weight: 3 },
  { id: 'D', weight: 3 },
  { id: 'E', weight: 2 },
  { id: 'F', weight: 2 },
  { id: 'G', weight: 3 },
  { id: 'H', weight: 2 },
];

mock.module('#site/next.json.mjs', {
  namedExports: { partners: PARTNERS },
});

const { default: generatePartners } =
  await import('#site/next-data/generators/partners.mjs');

// The shuffle seed is `Math.floor(Date.now() / 300000)`, so the result can only
// change on a 5-minute boundary. Each incident below is a real build failure,
// and each neighbouring time is the same code on either side of that window.
const TIMES = [
  ['2026-09-09T19:59:59.999Z', 'just before the 20:00 window'],
  ['2026-09-09T20:00:00.000Z', 'start of the 20:00 window'],
  ['2026-09-09T20:00:26.000Z', 'failed build: Windows, /en/download'],
  ['2026-09-09T20:01:26.000Z', 'failed build: Ubuntu, /en'],
  ['2026-09-09T20:04:59.999Z', 'end of the 20:00 window'],
  ['2026-09-09T20:05:00.000Z', 'just after the 20:00 window'],
  ['2026-11-06T17:14:51.000Z', 'passed build: Ubuntu, same commit as below'],
  ['2026-11-06T17:14:59.999Z', 'just before the 17:15 window'],
  ['2026-11-06T17:15:00.000Z', 'start of the 17:15 window'],
  ['2026-11-06T17:17:26.000Z', 'failed build: Windows, /en'],
  ['2026-11-06T17:19:59.999Z', 'end of the 17:15 window'],
  ['2026-11-06T17:20:00.000Z', 'just after the 17:15 window'],
];

describe('generatePartners', () => {
  for (const [now, description] of TIMES) {
    it(`returns every partner at ${now} (${description})`, async t => {
      t.mock.timers.enable({ apis: ['Date'], now: new Date(now) });

      const partners = await generatePartners();

      assert.ok(!partners.includes(undefined), 'result contains undefined');
      assert.equal(partners.length, PARTNERS.length);
      assert.deepEqual(new Set(partners), new Set(PARTNERS));
    });
  }
});
