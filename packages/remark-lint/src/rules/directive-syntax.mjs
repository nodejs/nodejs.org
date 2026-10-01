import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {'consistent' | 'always' | 'never'} padding
 *   Whether spaces are expected between the comment markers and the
 *   directive (`<!-- key=value -->` vs `<!--key=value-->`).
 */

const KEY = /^[a-z][a-z0-9_]*$/;
const LOOKS_LIKE_DIRECTIVE = /^\s*[A-Za-z_][\w-]*=/;
const EXTRA_DIRECTIVE = /\s[A-Za-z_][\w-]*=/;

export default defineRule({
  name: 'directive-syntax',
  description: 'Directives are single-line `<!--key=value-->` comments',
  defaults: { padding: 'consistent' },
  /** @param {Options} options */
  run(context, { padding }, file) {
    for (const comment of context.comments) {
      const { node, kind, inner } = comment;

      if (kind === 'tag' && LOOKS_LIKE_DIRECTIVE.test(inner)) {
        file.message(
          'Directives must fit on a single line: `<!--key=value-->`',
          node
        );
        continue;
      }

      if (kind !== 'directive') {
        continue;
      }

      const { key, value, padded, symmetric } = comment;

      if (!KEY.test(key)) {
        file.message(
          `Directive keys are lowercase \`snake_case\`; saw \`${key}\``,
          node
        );
      }

      if (!value.trim()) {
        file.message(`The \`${key}\` directive has no value`, node);
      }

      if (EXTRA_DIRECTIVE.test(value)) {
        file.message(
          'Each directive occupies its own comment; split this into one comment per `key=value`',
          node
        );
      }

      if (padding === 'consistent' && !symmetric) {
        file.message(
          'Pad both sides of the directive with a space, or neither',
          node
        );
      } else if (padding === 'always' && !(padded && symmetric)) {
        file.message(
          `Expected \`<!-- ${key}=${value.trim()} -->\` (padded with spaces)`,
          node
        );
      } else if (padding === 'never' && padded) {
        file.message(
          `Expected \`<!--${key}=${value.trim()}-->\` (no padding)`,
          node
        );
      }
    }
  },
});
