import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import dedent from 'dedent';

import { createProcessor, lint } from './utils.mjs';
import apiPreset from '../api.mjs';
import basePreset from '../index.mjs';
import { resolveRule } from '../preset.mjs';
import api from '../presets/api.mjs';
import base from '../presets/base.mjs';
import { RULES } from '../rules/index.mjs';

describe('presets', () => {
  it('only reference known rules', () => {
    for (const rules of [base.rules, api.rules]) {
      for (const name of Object.keys(rules)) {
        assert.ok(name in RULES, `unknown rule "${name}"`);
      }
    }
  });

  it('expose their defaults', () => {
    assert.equal(basePreset.defaults.rules, base.rules);
    assert.equal(apiPreset.defaults.rules, api.rules);
    assert.equal(apiPreset.defaults.settings.bullet, '*');
  });

  it('reject unknown rules', () => {
    assert.throws(
      () => createProcessor('api', { 'not-a-rule': true }),
      /Unknown rule "not-a-rule"/
    );
  });

  it('merge stringify settings without overriding configured ones', () => {
    const processor = createProcessor('api', { settings: { bullet: '-' } });

    assert.equal(processor.data('settings').bullet, '-');
    assert.equal(processor.data('settings').emphasis, '_');
  });
});

describe('resolveRule', () => {
  it('turns rules off', () => {
    for (const config of [false, 'off', 0]) {
      assert.equal(resolveRule('no-frontmatter', true, config, {})[0], 0);
    }
  });

  it('keeps default options when only a severity is given', () => {
    const [severity, options] = resolveRule('yaml-fields', true, 'error', {});

    assert.equal(severity, 2);
    assert.deepEqual(options.keys, RULES['yaml-fields'].meta.defaults.keys);
  });

  it('merges option objects with the defaults', () => {
    const [severity, options] = resolveRule(
      'link-targets',
      { basePaths: ['pages'], fragments: 'self' },
      { fragments: 'all' },
      {}
    );

    assert.equal(severity, 1);
    assert.deepEqual(options.basePaths, ['pages']);
    assert.equal(options.fragments, 'all');
    assert.equal(options.slugger, 'doc-kit');
  });

  it('accepts [severity, options] tuples', () => {
    const [severity, options] = resolveRule(
      'heading-depth',
      true,
      ['error', { max: 3 }],
      {}
    );

    assert.equal(severity, 2);
    assert.equal(options.max, 3);
  });

  it('turns a rule on when it is given options', () => {
    const [severity] = resolveRule(
      'prefer-reference-links',
      false,
      { ignoreFragments: false },
      {}
    );

    assert.equal(severity, 1);
  });

  it('passes bundled rules their own option values', () => {
    assert.deepEqual(resolveRule('maximum-line-length', 120, 80, {}), [1, 80]);
    assert.deepEqual(
      resolveRule('prohibited-strings', [{ yes: 'a' }], undefined, {}),
      [1, [{ yes: 'a' }]]
    );
  });

  it('forwards shared options into the rules that use them', () => {
    const shared = { releasedVersions: ['1.0.0'], typeMap: { X: 'x.html' } };

    assert.deepEqual(
      resolveRule('yaml-versions', true, undefined, shared)[1].releasedVersions,
      ['1.0.0']
    );
    assert.deepEqual(
      resolveRule('type-annotation-syntax', true, undefined, shared)[1].typeMap,
      { X: 'x.html' }
    );
  });
});

describe('processing', () => {
  it('tags messages with the rule and source', async () => {
    const { file } = await lint('---\na: 1\n---\n\n# T\n');
    const message = file.messages.find(
      ({ ruleId }) => ruleId === 'no-frontmatter'
    );

    assert.ok(message);
    assert.equal(message.source, 'node-core');
    assert.equal(message.fatal, false);
  });

  it('marks error-severity messages as fatal', async () => {
    const { file } = await lint('---\na: 1\n---\n\n# T\n', {
      'no-frontmatter': 'error',
    });
    const message = file.messages.find(
      ({ ruleId }) => ruleId === 'no-frontmatter'
    );

    assert.equal(message.fatal, true);
  });

  it('honors `<!-- lint disable -->` comments for every rule', async () => {
    const { file } = await lint(dedent`
      # Title

      <!--introduced_in=v1.0.0-->

      Text.

      <!-- lint disable type-annotation-style maximum-line-length -->

      A { string } value ${'x'.repeat(130)}

      <!-- lint enable type-annotation-style maximum-line-length -->

      A { string } value
    `);

    const styles = file.messages.filter(
      ({ ruleId }) => ruleId === 'type-annotation-style'
    );
    const lengths = file.messages.filter(
      ({ ruleId }) => ruleId === 'maximum-line-length'
    );

    assert.equal(styles.length, 1);
    assert.equal(lengths.length, 0);
  });

  it('parses type annotations only when a rule needs them', async () => {
    const source = '# T\n\nA {string|Buffer} here.\n';
    const withTypes = await lint(source);
    const withoutTypes = await lint(source, undefined, { preset: 'base' });

    assert.ok(
      JSON.stringify(withTypes.tree).includes('"typeAnnotation"'),
      'api preset parses annotations'
    );
    assert.ok(
      !JSON.stringify(withoutTypes.tree).includes('"typeAnnotation"'),
      'base preset leaves braces as text'
    );
  });

  it('serializes type annotations exactly as written', async () => {
    const source = dedent`
      # Title

      * \`a\` {string | Buffer\\[]} Text.
      * Returns: {Promise<Object>}
    `;
    const { tree, file, processor } = await lint(`${source}\n`);

    assert.equal(processor.stringify(tree, file), `${source}\n`);
  });
});
