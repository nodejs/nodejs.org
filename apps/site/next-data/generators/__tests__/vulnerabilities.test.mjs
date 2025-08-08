import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { groupVulnerabilitiesByMajor } from '#site/next-data/generators/vulnerabilities.mjs';

const MOCK_VULNERABILITIES = {
  1: {
    cve: ['CVE-2017-1000381'],
    vulnerable: '8.x || 7.x || 4.x || 6.x || 5.x',
  },
  8: {
    cve: ['CVE-2016-5180'],
    vulnerable: '0.10.x || 0.12.x || 4.x',
  },
  11: {
    cve: [],
    vulnerable: '6.x',
  },
  24: {
    cve: ['CVE-2016-1669'],
    vulnerable: '>=6.0.0 <6.2.0 || 5.x || 4.x',
  },
  54: {
    cve: ['CVE-2018-12115'],
    vulnerable: '<= 10',
  },
};

const VULNERABILITIES_VALUES = Object.values(MOCK_VULNERABILITIES);

describe('groupVulnerabilitiesByMajor', () => {
  it('returns an empty object when given an empty array', () => {
    const grouped = groupVulnerabilitiesByMajor([]);
    assert.deepEqual(grouped, {});
  });

  it('ignores non-numeric values in the "vulnerable" string', () => {
    const vulnerabilities = [
      { cve: ['CVE-2021-1234'], vulnerable: 'foo || bar || 12.x' },
      { cve: ['CVE-2021-5678'], vulnerable: 'baz || 13.x' },
    ];
    const grouped = groupVulnerabilitiesByMajor(vulnerabilities);
    assert.deepEqual(Object.keys(grouped).sort(Number), ['12', '13']);
  });

  it('handles vulnerabilities with no "vulnerable" field gracefully', () => {
    const vulnerabilities = [
      { cve: ['CVE-2021-1234'], vulnerable: '12.x' },
      { cve: ['CVE-2021-5678'] }, // no vulnerable field
    ];
    const grouped = groupVulnerabilitiesByMajor(vulnerabilities);
    assert.deepEqual(Object.keys(grouped).sort(Number), ['12']);
  });

  it('can group a single version', () => {
    const vulnerabilities = [{ cve: ['CVE-2021-1234'], vulnerable: '12.x' }];
    const grouped = groupVulnerabilitiesByMajor(vulnerabilities);
    assert.deepEqual(Object.keys(grouped).sort(Number), ['12']);
  });

  it('can group a 0.x version', () => {
    const vulnerabilities = [{ cve: ['CVE-2021-1234'], vulnerable: '0.10.x' }];
    const grouped = groupVulnerabilitiesByMajor(vulnerabilities);
    assert.deepEqual(Object.keys(grouped).sort(Number), ['0']);
  });

  it('can group two versions', () => {
    const vulnerabilities = [
      { cve: ['CVE-2021-1234'], vulnerable: '12.x || 13.x' },
    ];
    const grouped = groupVulnerabilitiesByMajor(vulnerabilities);
    assert.deepEqual(Object.keys(grouped).sort(Number), ['12', '13']);
  });

  it('can group an integer version and a 0.X version', () => {
    const vulnerabilities = [
      { cve: ['CVE-2021-1234'], vulnerable: '0.10.x || 12.x' },
    ];
    const grouped = groupVulnerabilitiesByMajor(vulnerabilities);
    assert.deepEqual(Object.keys(grouped).sort(Number), ['0', '12']);
  });

  it('returns a the major when given a greater-than range', () => {
    const vulnerabilities = [
      { cve: ['CVE-2021-5678'], vulnerable: '>=6.0.0 <6.2.0' },
    ];
    const grouped = groupVulnerabilitiesByMajor(vulnerabilities);
    assert.deepEqual(Object.keys(grouped).sort(Number), ['6']);
  });

  it('returns a descending list of major versions when given a less-than range', () => {
    const vulnerabilities = [{ cve: ['CVE-2021-5678'], vulnerable: '< 5' }];
    const grouped = groupVulnerabilitiesByMajor(vulnerabilities);
    assert.deepEqual(Object.keys(grouped).sort(Number), [
      '0',
      '1',
      '2',
      '3',
      '4',
    ]);
  });

  it('returns a descending list of major versions when given a less-than or equal range, inclusive', () => {
    const vulnerabilities = [{ cve: ['CVE-2021-5678'], vulnerable: '<= 5' }];
    const grouped = groupVulnerabilitiesByMajor(vulnerabilities);
    assert.deepEqual(Object.keys(grouped).sort(Number), [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
    ]);
  });

  it('groups vulnerabilities by major version extracted from "vulnerable" string', () => {
    const grouped = groupVulnerabilitiesByMajor(VULNERABILITIES_VALUES);

    assert.deepEqual(Object.keys(grouped).sort(Number), [
      '0',
      '1', // note, comes from the <= 10
      '2', // note, comes from the <= 10
      '3', // note, comes from the <= 10
      '4',
      '5',
      '6',
      '7',
      '8',
      '9', // note, comes from the <= 10
      '10', // note, comes from the <= 10
    ]);

    assert.strictEqual(grouped['0'].length, 3);
    assert.strictEqual(grouped['1'].length, 1);
    assert.strictEqual(grouped['2'].length, 1);
    assert.strictEqual(grouped['3'].length, 1);
    assert.strictEqual(grouped['4'].length, 4);
    assert.strictEqual(grouped['5'].length, 3);
    assert.strictEqual(grouped['6'].length, 4);
    assert.strictEqual(grouped['7'].length, 2);
    assert.strictEqual(grouped['8'].length, 2);
    assert.strictEqual(grouped['9'].length, 1);
    assert.strictEqual(grouped['10'].length, 1);
  });
});
