import assert from 'node:assert/strict';
import { describe, it, beforeEach, afterEach } from 'node:test';

import { formatLighthouseResults } from '../index.mjs';

function checkExpectations({ calls }, expectations) {
  expectations.forEach(expectation => {
    const args = calls[0].arguments;
    assert.equal(args[0], 'comment');
    assert.ok(args[1].includes(expectation));
  });
}

describe('formatLighthouseResults', () => {
  const MOCK_VERCEL_PREVIEW_URL = `https://some.vercel.preview.url`;

  const MOCK_LIGHTHOUSE_RESULT = `[
    {
      "url": "${MOCK_VERCEL_PREVIEW_URL}/en",
      "isRepresentativeRun": true,
      "summary": { "performance": 0.99, "accessibility": 0.98, "best-practices": 1, "seo": 0.96, "pwa": 0.71 }
    },
    {
      "url": "${MOCK_VERCEL_PREVIEW_URL}/en/download",
      "isRepresentativeRun": true,
      "summary": { "performance": 0.49, "accessibility": 0.75, "best-practices": 1, "seo": 0.90, "pwa": 0.71 }
    }
  ]`;

  const MOCK_LIGHTHOUSE_LINKS = `{
    "${MOCK_VERCEL_PREVIEW_URL}/en": "fake.url/to/result/1",
    "${MOCK_VERCEL_PREVIEW_URL}/en/download" : "fake.url/to/result/2"
  }`;

  let mockCore, originalEnv;

  beforeEach(t => {
    mockCore = { setOutput: t.mock.fn() };
    originalEnv = process.env;
    process.env = {
      ...process.env,
      LIGHTHOUSE_RESULT: MOCK_LIGHTHOUSE_RESULT,
      LIGHTHOUSE_LINKS: MOCK_LIGHTHOUSE_LINKS,
      VERCEL_PREVIEW_URL: MOCK_VERCEL_PREVIEW_URL,
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('formats preview urls correctly', () => {
    formatLighthouseResults({ core: mockCore });

    checkExpectations(mockCore.setOutput.mock, [
      `[/en](${MOCK_VERCEL_PREVIEW_URL}/en)`,
      `[/en/download](${MOCK_VERCEL_PREVIEW_URL}/en/download)`,
    ]);
  });

  it('formats stoplight colors correctly', () => {
    formatLighthouseResults({ core: mockCore });

    checkExpectations(mockCore.setOutput.mock, [`🟢 90`, `🟠 75`, `🔴 49`]);
  });
});
