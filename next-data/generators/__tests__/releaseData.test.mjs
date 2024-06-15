/**
 * Force jest to run this test in a Node.js environment
 * 'cause we will have "ReferenceError: TextEncoder is not defined"
 * @jest-environment node
 */
import nodevu from '@nodevu/core';

import generateReleaseData from '@/next-data/generators/releaseData.mjs';

jest.mock('@nodevu/core');

describe('generateReleaseData', () => {
  test('generates release data with correct status', async () => {
    const mockNodevuOutput = {
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
    };
    nodevu.mockResolvedValue(mockNodevuOutput);

    const result = await generateReleaseData();
    expect(result).toHaveLength(1);
    const release = result[0];

    expect(release.major).toBe(14);
    expect(release.version).toBe('14.0.0');
    expect(release.versionWithPrefix).toBe('v14.0.0');
    expect(release.codename).toBe('');
    expect(release.isLts).toBe(true);
    expect(release.npm).toBe('6.14.10');
    expect(release.v8).toBe('8.0.276.20');
    expect(release.releaseDate).toBe('2021-04-20');
    expect(release.modules).toBe('83');
    expect(release.status).toBe('LTS');
  });
});
