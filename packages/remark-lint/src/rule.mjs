import { lintRule } from 'unified-lint-rule';

import { getContext } from './context.mjs';

export const SOURCE = 'node-core';

/**
 * @typedef {import('./context.mjs').Entry} Entry
 * @typedef {ReturnType<typeof getContext>} Context
 */

/**
 * @template {Record<string, unknown>} Options
 * @typedef RuleDefinition
 * @property {string} name
 *   The rule name (also its `ruleId`, e.g. for `<!-- lint disable name -->`).
 * @property {string} description
 *   One-line description, used for documentation.
 * @property {boolean} [syntax]
 *   Whether the rule needs `{Type}` annotations parsed as `typeAnnotation`
 *   nodes. The preset enables the syntax extension when such a rule is on.
 * @property {Options} [defaults]
 *   Default options, shallow-merged with user options.
 * @property {(context: Context, options: Options, file: import('vfile').VFile) => void | Promise<void>} run
 */

/**
 * Defines a `node-core` lint rule on top of the shared document context.
 *
 * @template {Record<string, unknown>} Options
 * @param {RuleDefinition<Options>} definition
 */
export const defineRule = definition => {
  const { name, defaults = {}, run } = definition;

  const plugin = lintRule(`${SOURCE}:${name}`, (tree, file, options) =>
    run(getContext(tree, file), resolveOptions(defaults, options), file)
  );

  plugin.meta = { ...definition, external: false };

  return plugin;
};

/**
 * Merges user options into a rule's defaults. Objects merge shallowly; any
 * other value (or nothing) keeps the defaults.
 *
 * @param {Record<string, unknown>} defaults
 * @param {unknown} options
 */
export const resolveOptions = (defaults, options) =>
  options && typeof options === 'object' && !Array.isArray(options)
    ? { ...defaults, ...options }
    : { ...defaults };

/**
 * Wraps an external `remark-lint-*` plugin with the metadata the registry
 * expects.
 *
 * @param {string} name
 * @param {import('unified').Plugin} plugin
 * @param {string} description
 */
export const externalRule = (name, plugin, description) =>
  Object.assign(
    /** @type {import('unified').Plugin} */
    function external(...args) {
      return plugin.apply(this, args);
    },
    { meta: { name, description, external: true } }
  );
