import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import getMajorNodeReleases from '#site/next-data/generators/majorNodeReleases.mjs';

const createRelease = (version, date, lts = false) => ({
  version,
  date,
  files: [],
  npm: '11.0.0',
  v8: '14.0.0.0',
  modules: '150',
  lts,
  security: false,
});

const SCHEDULE = {
  v26: {
    start: '2026-05-05',
    lts: '2026-10-28',
    maintenance: '2027-10-20',
    end: '2029-04-30',
    codename: '',
  },
  v27: {
    alpha: '2026-10-28',
    start: '2027-04-22',
    lts: '2027-10-20',
    end: '2030-04-30',
    codename: '',
  },
};

const mockFetch = (index, schedule = SCHEDULE) => {
  globalThis.fetch = async url => ({
    json: async () => (url.includes('schedule') ? schedule : index),
  });
};

describe('getMajorNodeReleases', () => {
  it('keeps the pre-release identifiers of Alpha releases', async () => {
    mockFetch([
      createRelease('v27.0.0-alpha.1.0.0', '2026-11-25'),
      createRelease('v27.0.0-alpha.0.0.0', '2026-10-28'),
      createRelease('v26.1.0', '2026-10-28', 'Codename'),
    ]);

    const majors = await getMajorNodeReleases();

    assert.deepEqual(
      majors.map(([version]) => version),
      ['v27', 'v26']
    );

    const [, v27] = majors[0];

    assert.deepEqual(Object.keys(v27.releases), [
      'v27.0.0-alpha.1.0.0',
      'v27.0.0-alpha.0.0.0',
    ]);
    assert.equal(
      v27.releases['v27.0.0-alpha.1.0.0'].semver.raw,
      '27.0.0-alpha.1.0.0'
    );
    assert.equal(v27.releases['v27.0.0-alpha.1.0.0'].semver.major, 27);
    assert.equal(v27.releases['v27.0.0-alpha.1.0.0'].lts.isLts, false);
    assert.equal(v27.support.phases.dates.end, '2030-04-30');
  });

  it('lists Alpha releases after the stable releases of the same line', async () => {
    mockFetch([
      createRelease('v27.0.0', '2027-04-22'),
      createRelease('v27.0.0-alpha.1.0.0', '2026-11-25'),
      createRelease('v27.0.0-alpha.0.0.0', '2026-10-28'),
    ]);

    const [[version, v27]] = await getMajorNodeReleases();

    assert.equal(version, 'v27');
    assert.deepEqual(Object.keys(v27.releases), [
      'v27.0.0',
      'v27.0.0-alpha.1.0.0',
      'v27.0.0-alpha.0.0.0',
    ]);
  });

  it('ignores Alpha releases of release lines without documented support', async () => {
    mockFetch([
      createRelease('v28.0.0-alpha.0.0.0', '2027-10-27'),
      createRelease('v26.1.0', '2026-10-28', 'Codename'),
    ]);

    const majors = await getMajorNodeReleases();

    assert.deepEqual(
      majors.map(([version]) => version),
      ['v26']
    );
  });
});
