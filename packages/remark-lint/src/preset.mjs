import remarkGfm from 'remark-gfm';
import remarkMessageControl from 'remark-message-control';

import { SOURCE, resolveOptions } from './rule.mjs';
import { RULES } from './rules/index.mjs';
import remarkTypeAnnotations from './syntax.mjs';

/**
 * Option keys that are not rule names.
 */
export const SHARED_OPTIONS = ['settings', 'releasedVersions', 'typeMap'];

// Which shared options are forwarded into which rules
const SHARED_OPTION_TARGETS = {
  releasedVersions: ['yaml-versions', 'directive-value'],
  typeMap: ['type-annotation-syntax', 'type-annotation-resolution'],
};

const SEVERITIES = {
  off: 0,
  false: 0,
  0: 0,
  on: 1,
  warn: 1,
  true: 1,
  1: 1,
  error: 2,
  2: 2,
};

/**
 * @typedef {false | true | 0 | 1 | 2 | 'off' | 'on' | 'warn' | 'error'} Severity
 * @typedef {Severity | [Severity, unknown] | Record<string, unknown> | unknown} RuleConfig
 */

/**
 * Whether a value is a `[severity, options]` tuple (as opposed to an array
 * of options, like the one `prohibited-strings` takes).
 *
 * @param {unknown} value
 */
const isTuple = value =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.length <= 2 &&
  (typeof value[0] === 'boolean' ||
    typeof value[0] === 'number' ||
    typeof value[0] === 'string') &&
  String(value[0]) in SEVERITIES;

/**
 * Whether a value is a severity on its own (`false`, `'warn'`, `2`, ...).
 *
 * @param {unknown} value
 */
const isSeverity = value =>
  typeof value === 'boolean' ||
  ((typeof value === 'number' || typeof value === 'string') &&
    String(value) in SEVERITIES);

/**
 * Splits a rule configuration into a severity and its options.
 *
 * @param {RuleConfig} config
 * @returns {{ severity?: 0 | 1 | 2, options?: unknown, hasOptions: boolean }}
 */
const splitConfig = config => {
  if (config === undefined) {
    return { hasOptions: false };
  }

  if (isTuple(config)) {
    return {
      severity: SEVERITIES[String(config[0])],
      options: config[1],
      hasOptions: config.length === 2,
    };
  }

  if (isSeverity(config)) {
    return { severity: SEVERITIES[String(config)], hasOptions: false };
  }

  return { options: config, hasOptions: true };
};

/**
 * Resolves the final `[severity, options]` for a rule from the preset's
 * defaults and the user's configuration.
 *
 * @param {string} name
 * @param {RuleConfig} defaultConfig
 * @param {RuleConfig} userConfig
 * @param {Record<string, unknown>} shared
 */
export const resolveRule = (name, defaultConfig, userConfig, shared) => {
  const rule = RULES[name];
  const preset = splitConfig(defaultConfig);
  const user = splitConfig(userConfig);

  // A preset default that is only options means "on"
  const presetSeverity = preset.severity ?? (preset.hasOptions ? 1 : 0);

  let severity;

  if (user.severity !== undefined) {
    severity = user.severity;
  } else if (user.hasOptions) {
    // Giving options turns a rule on, at the preset's severity if it has one
    severity = presetSeverity || 1;
  } else {
    severity = presetSeverity;
  }

  const defaultOptions = preset.options;
  const userOptions = user.options;
  const hasUserOptions = user.hasOptions;

  let options = hasUserOptions ? userOptions : defaultOptions;

  // Internal rules take option objects, which merge with the defaults
  if (!rule.meta.external) {
    options = resolveOptions(
      resolveOptions(rule.meta.defaults ?? {}, defaultOptions),
      hasUserOptions ? userOptions : undefined
    );

    for (const [key, targets] of Object.entries(SHARED_OPTION_TARGETS)) {
      if (targets.includes(name) && shared[key] !== undefined) {
        options[key] ??= shared[key];
      }
    }
  }

  return [severity, options];
};

/**
 * Creates a configurable preset.
 *
 * @param {{ settings: Record<string, unknown>, rules: Record<string, RuleConfig> }} defaults
 * @param {string} presetName
 */
export const createPreset = ({ settings, rules }, presetName) => {
  /**
   * @this {import('unified').Processor}
   * @param {Record<string, RuleConfig> & { settings?: Record<string, unknown>, releasedVersions?: Array<string>, typeMap?: unknown }} [options]
   */
  function nodeCoreRemarkLint(options = {}) {
    const { settings: userSettings, ...rest } = options;
    const shared = {};
    const userRules = {};

    for (const [key, value] of Object.entries(rest)) {
      if (SHARED_OPTIONS.includes(key)) {
        shared[key] = value;
      } else if (key in RULES) {
        userRules[key] = value;
      } else {
        throw new Error(
          `Unknown rule "${key}" in ${presetName} options. Known rules: ${Object.keys(RULES).join(', ')}`
        );
      }
    }

    // Stringify settings: preset defaults, then whatever was already configured
    this.data('settings', {
      ...settings,
      ...this.data('settings'),
      ...userSettings,
    });

    // `<!-- lint disable rule -->` comments control both bundled and our rules.
    // This is queued now but attached last, after every rule (see remark-lint).
    this.use(function control() {
      this.use(remarkMessageControl, {
        name: 'lint',
        source: ['remark-lint', SOURCE],
      });
    });

    this.use(remarkGfm);

    let needsTypeAnnotations = false;

    for (const [name, { plugin, meta }] of Object.entries(RULES)) {
      const [severity, ruleOptions] = resolveRule(
        name,
        rules[name],
        userRules[name],
        shared
      );

      if (!severity) {
        continue;
      }

      needsTypeAnnotations ||= Boolean(meta.syntax);

      this.use(plugin, [severity, ruleOptions]);
    }

    if (needsTypeAnnotations) {
      this.use(remarkTypeAnnotations);
    }
  }

  nodeCoreRemarkLint.defaults = { settings, rules };

  return nodeCoreRemarkLint;
};
