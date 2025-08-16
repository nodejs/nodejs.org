import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import generateVulnerabilityData from '#site/next-data/generators/vulnerabilities.mjs';

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

// Note: We mock fetch to return this object shape in tests

describe('generateVulnerabilityData', () => {
  it('returns an empty object when source JSON is empty', async () => {
    globalThis.fetch = async () => ({
      json: async () => ({}),
    });

    const grouped = await generateVulnerabilityData();

    assert.deepEqual(grouped, {});
  });

  it('ignores non-numeric values in the "vulnerable" string', async () => {
    globalThis.fetch = async () => ({
      json: async () => ({
        a: { cve: ['CVE-2021-1234'], vulnerable: 'foo || bar || 12.x' },
        b: { cve: ['CVE-2021-5678'], vulnerable: 'baz || 13.x' },
      }),
    });

    const grouped = await generateVulnerabilityData();

    assert.deepEqual(Object.keys(grouped).sort(Number), ['12', '13']);
  });

  it('can group a single version', async () => {
    globalThis.fetch = async () => ({
      json: async () => ({ a: { cve: ['CVE-2021-1234'], vulnerable: '12.x' } }),
    });

    const grouped = await generateVulnerabilityData();

    assert.deepEqual(Object.keys(grouped).sort(Number), ['12']);
  });

  it('can group a 0.x version', async () => {
    globalThis.fetch = async () => ({
      json: async () => ({
        a: { cve: ['CVE-2021-1234'], vulnerable: '0.10.x' },
      }),
    });

    const grouped = await generateVulnerabilityData();

    assert.deepEqual(Object.keys(grouped).sort(Number), ['0']);
  });

  it('can group two versions', async () => {
    globalThis.fetch = async () => ({
      json: async () => ({
        a: { cve: ['CVE-2021-1234'], vulnerable: '12.x || 13.x' },
      }),
    });

    const grouped = await generateVulnerabilityData();

    assert.deepEqual(Object.keys(grouped).sort(Number), ['12', '13']);
  });

  it('returns the major when given a greater-than range', async () => {
    globalThis.fetch = async () => ({
      json: async () => ({
        a: { cve: ['CVE-2021-5678'], vulnerable: '>=6.0.0 <6.2.0' },
      }),
    });

    const grouped = await generateVulnerabilityData();

    assert.deepEqual(Object.keys(grouped).sort(Number), ['6']);
  });

  it('returns a descending list of major versions when given a less-than range', async () => {
    globalThis.fetch = async () => ({
      json: async () => ({ a: { cve: ['CVE-2021-5678'], vulnerable: '< 5' } }),
    });

    const grouped = await generateVulnerabilityData();

    assert.deepEqual(Object.keys(grouped).sort(Number), [
      '0',
      '1',
      '2',
      '3',
      '4',
    ]);
  });

  it('treats <= as inclusive of the specified major only (based on current implementation)', async () => {
    globalThis.fetch = async () => ({
      json: async () => ({ a: { cve: ['CVE-2021-5678'], vulnerable: '<= 5' } }),
    });

    const grouped = await generateVulnerabilityData();

    assert.deepEqual(Object.keys(grouped).sort(Number), ['5']);
  });

  it('groups vulnerabilities by major version extracted from "vulnerable" string', async () => {
    globalThis.fetch = async () => ({
      json: async () => MOCK_VULNERABILITIES,
    });

    const grouped = await generateVulnerabilityData();

    assert.deepEqual(Object.keys(grouped).sort(Number), [
      '0',
      '4',
      '5',
      '6',
      '7',
      '8',
      '10',
    ]);

    assert.strictEqual(grouped['0'].length, 2);
    assert.strictEqual(grouped['4'].length, 3);
    assert.strictEqual(grouped['5'].length, 2);
    assert.strictEqual(grouped['6'].length, 3);
    assert.strictEqual(grouped['7'].length, 1);
    assert.strictEqual(grouped['8'].length, 1);
    assert.strictEqual(grouped['10'].length, 1);
  });
});
