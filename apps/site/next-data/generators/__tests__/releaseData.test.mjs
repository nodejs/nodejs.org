import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('generateReleaseData', () => {
  let currentNodevuData = {};
  const nodevuMock = () => Promise.resolve(currentNodevuData);

  const runWithNodevuData = async (t, now, data) => {
    currentNodevuData = data;
    t.mock.timers.enable({ now: new Date(now) });

    t.mock.module('@nodevu/core', {
      defaultExport: nodevuMock,
    });

    const { default: generateReleaseData } =
      await import('#site/next-data/generators/releaseData.mjs');

    return generateReleaseData();
  };

  it('returns End-of-life when release is on or past EOL date', async t => {
    const result = await runWithNodevuData(t, '2024-10-18', {
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
    });

    assert.equal(result.length, 1);
    assert.partialDeepStrictEqual(result[0], {
      major: 14,
      version: '14.0.0',
      versionWithPrefix: 'v14.0.0',
      codename: '',
      npm: '6.14.10',
      v8: '8.0.276.20',
      releaseDate: '2021-04-20',
      initialDate: '2021-04-20',
      modules: '83',
      status: 'End-of-life',
    });
  });

  it('returns Current when release is not EOL and latest is not LTS', async t => {
    const result = await runWithNodevuData(t, '2026-04-14', {
      20: {
        releases: {
          '20.12.0': {
            semver: { major: 20, raw: '20.12.0' },
            dependencies: { npm: '10.8.2', v8: '11.3.244.8' },
            lts: { isLts: false },
            releaseDate: '2026-03-26',
            modules: { version: '115' },
          },
        },
        support: {
          phases: {
            dates: {
              start: '2025-10-22',
              lts: '2026-10-22',
              maintenance: '2027-10-22',
              end: '2028-04-30',
            },
          },
        },
      },
    });

    assert.equal(result[0]?.status, 'Current');
  });

  it('returns LTS when release is not EOL and latest is flagged as LTS', async t => {
    const result = await runWithNodevuData(t, '2026-04-14', {
      22: {
        releases: {
          '22.7.0': {
            semver: { major: 22, raw: '22.7.0' },
            dependencies: { npm: '10.9.0', v8: '12.4.254.10' },
            lts: { isLts: true },
            releaseDate: '2026-02-18',
            modules: { version: '124' },
          },
        },
        support: {
          phases: {
            dates: {
              start: '2026-04-23',
              lts: '2026-10-21',
              maintenance: '2027-10-20',
              end: '2029-04-30',
            },
          },
        },
      },
    });

    assert.equal(result[0]?.status, 'LTS');
  });

  it('returns Current when release is not EOL and LTS date has passed but latest is not LTS', async t => {
    const result = await runWithNodevuData(t, '2026-04-14', {
      24: {
        releases: {
          '24.1.0': {
            semver: { major: 24, raw: '24.1.0' },
            dependencies: { npm: '11.1.0', v8: '13.0.12.7' },
            lts: { isLts: false },
            releaseDate: '2026-03-10',
            modules: { version: '130' },
          },
        },
        support: {
          phases: {
            dates: {
              start: '2025-10-10',
              lts: '2026-01-01',
              maintenance: '2027-01-01',
              end: '2028-10-01',
            },
          },
        },
      },
    });

    assert.equal(result[0]?.status, 'Current');
  });

  it('uses latest and earliest release dates for releaseDate and initialDate', async t => {
    const result = await runWithNodevuData(t, '2026-04-14', {
      26: {
        releases: {
          '26.2.0': {
            semver: { major: 26, raw: '26.2.0' },
            dependencies: { npm: '11.3.1', v8: '13.2.20.1' },
            lts: { isLts: false },
            releaseDate: '2026-04-01',
            modules: { version: '132' },
          },
          '26.0.0': {
            semver: { major: 26, raw: '26.0.0' },
            dependencies: { npm: '11.0.0', v8: '13.1.0.0' },
            lts: { isLts: false },
            releaseDate: '2025-10-21',
            modules: { version: '131' },
          },
        },
        support: {
          phases: {
            dates: {
              start: '2025-10-21',
              lts: '2026-10-20',
              maintenance: '2027-10-19',
              end: '2029-04-30',
            },
          },
        },
      },
    });

    assert.equal(result[0]?.releaseDate, '2026-04-01');
    assert.equal(result[0]?.initialDate, '2025-10-21');
  });
});
