import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { VFile } from 'vfile';

import api from '../api.mjs';
import base from '../index.mjs';
import { RULES } from '../rules/index.mjs';

/**
 * Creates a processor with one of the presets.
 *
 * @param {'api' | 'base'} preset
 * @param {Record<string, unknown>} [options]
 */
export const createProcessor = (preset, options) =>
  unified()
    .use(remarkParse)
    .use(preset === 'api' ? api : base, options)
    .use(remarkStringify)
    .freeze();

/**
 * Lints markdown with a preset and returns the file.
 *
 * @param {string} markdown
 * @param {Record<string, unknown>} [options]
 * @param {{ preset?: 'api' | 'base', path?: string, cwd?: string }} [file]
 */
export const lint = async (
  markdown,
  options,
  { preset = 'api', path = 'doc/api/test.md', cwd = process.cwd() } = {}
) => {
  const processor = createProcessor(preset, options);
  const file = new VFile({ path, value: markdown, cwd });
  const tree = processor.parse(file);

  await processor.run(tree, file);

  return { file, tree, processor };
};

/**
 * Lints markdown with a single rule enabled and returns the message reasons.
 *
 * @param {string} rule
 * @param {string} markdown
 * @param {unknown} [options]
 * @param {{ preset?: 'api' | 'base', path?: string, cwd?: string, shared?: Record<string, unknown> }} [extra]
 */
export const lintRule = async (rule, markdown, options, extra = {}) => {
  const config = Object.fromEntries(
    Object.keys(RULES).map(name => [name, false])
  );

  config[rule] = options ?? true;
  Object.assign(config, extra.shared);

  const { file } = await lint(markdown, config, extra);

  return file.messages.map(message => message.reason);
};

/**
 * @typedef Case
 * @property {string} name
 * @property {string} input
 * @property {Array<string | RegExp>} expected
 * @property {unknown} [options]
 * @property {string} [path]
 * @property {string} [cwd]
 * @property {'api' | 'base'} [preset]
 * @property {Record<string, unknown>} [shared]
 */

/**
 * Declares a test suite for a rule from a table of cases.
 *
 * @param {string} rule
 * @param {Array<Case>} cases
 */
export const testRule = (rule, cases) => {
  describe(rule, () => {
    for (const { name, input, expected, options, ...extra } of cases) {
      it(name, async () => {
        const reasons = await lintRule(rule, input, options, extra);

        assert.equal(
          reasons.length,
          expected.length,
          `Expected ${expected.length} message(s), got:\n${reasons.map(reason => `  - ${reason}`).join('\n') || '  (none)'}`
        );

        expected.forEach((expectation, index) => {
          if (expectation instanceof RegExp) {
            assert.match(reasons[index], expectation);
          } else {
            assert.equal(reasons[index], expectation);
          }
        });
      });
    }
  });
};
