import { getNodejsChangelog } from '../getNodeJsChangelog';

describe('getNodejsChangelog', () => {
  it('returns the correct changelog URL for major version >= 4', () => {
    const version = '14.2.0';
    const expectedUrl =
      'https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V14.md#14.2.0';

    const result = getNodejsChangelog(version);

    expect(result).toBe(expectedUrl);
  });

  it('returns the correct changelog URL for major version >= 1', () => {
    const version = '1.8.3';
    const expectedUrl =
      'https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_IOJS.md#1.8.3';

    const result = getNodejsChangelog(version);

    expect(result).toBe(expectedUrl);
  });

  it('returns the correct changelog URL for minor version 12 or 10', () => {
    const version1 = '6.12.0';
    const expectedUrl1 =
      'https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V6.md#6.12.0';

    const result1 = getNodejsChangelog(version1);

    expect(result1).toBe(expectedUrl1);

    const version2 = '8.10.0';
    const expectedUrl2 =
      'https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V8.md#8.10.0';

    const result2 = getNodejsChangelog(version2);

    expect(result2).toBe(expectedUrl2);
  });

  it('returns the correct changelog URL for other versions', () => {
    const version = '0.12.7';
    const expectedUrl =
      'https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V012.md#0.12.7';

    const result = getNodejsChangelog(version);

    expect(result).toBe(expectedUrl);
  });
});
