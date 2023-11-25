import { strictEqual, ok } from 'node:assert';
import { describe, it, beforeEach, afterEach, mock } from 'node:test';

import { formatLighthouseResults } from '../index.mjs';

describe('formatLighthouseResults', () => {
  // WARNING: if you change this value, you must also change the value in regex below
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

  const mockCore = { setOutput: mock.fn() };
  let originalEnv;

  beforeEach(() => {
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

    const call = mockCore.setOutput.mock.calls[0];
    const expectedOutput = [
      /\/en\]\(https:\/\/some.vercel.preview.url\/en\)/,
      /\/en\/download\]\(https:\/\/some.vercel.preview.url\/en\/download\)/,
    ];

    strictEqual(call.arguments[0], 'comment');
    expectedOutput.forEach(expected => {
      ok(call.arguments[1].match(expected));
    });
  });

  it('formats stoplight colors correctly', () => {
    formatLighthouseResults({ core: mockCore });

    const call = mockCore.setOutput.mock.calls[0];
    const expectedOutput = [/🟢 99/, /🟠 75/, /🔴 49/];

    strictEqual(call.arguments[0], 'comment');
    expectedOutput.forEach(expected => {
      ok(call.arguments[1].match(expected));
    });
  });
});
