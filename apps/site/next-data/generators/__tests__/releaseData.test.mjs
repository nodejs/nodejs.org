import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('generateReleaseData', () => {
  it('generates release data with correct status', async t => {
    t.mock.timers.enable({ now: new Date('2024-10-18') });

    t.mock.module('@nodevu/core', {
      defaultExport: () =>
        Promise.resolve({
          14: {
            releases: {
              '14.0.0': {
                semver: { major: 14, raw: '14.0.0' },
                dependencies: { npm: '6.14.10', v8: '8.0.276.20' },
                releaseDate: '2021-04-20',
                modules: { version: '83' },
              },
            },
            support: {
              phases: {
                dates: {
                  start: '2021-10-26',
                  lts: '2022-10-18',
                  maintenance: '2023-10-18',
                  end: '2024-10-18',
                },
              },
            },
          },
        }),
    });

    const { default: generateReleaseData } = await import(
      '#site/next-data/generators/releaseData.mjs'
    );

    const result = await generateReleaseData();

    assert.equal(result.length, 1);
    assert.partialDeepStrictEqual(result[0], {
      major: 14,
      version: '14.0.0',
      versionWithPrefix: 'v14.0.0',
      codename: '',
      isLts: false,
      npm: '6.14.10',
      v8: '8.0.276.20',
      releaseDate: '2021-04-20',
      modules: '83',
      status: 'End-of-life',
    });
  });
});
