import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {'never' | 'always'} unionSpacing
 *   Whether `|` in unions is surrounded by spaces (`{A|B}` vs `{A | B}`).
 */

// A single `|` (not the `||` of a default value), with surrounding spaces
const UNION = /(?<!\|)\s*\|\s*(?!\|)/g;

export default defineRule({
  name: 'type-annotation-style',
  description: 'Type annotations are unpadded, with consistent union spacing',
  syntax: true,
  defaults: { unionSpacing: 'never' },
  /** @param {Options} options */
  run(context, { unionSpacing }, file) {
    for (const { node } of context.typeAnnotations) {
      const raw = node.raw ?? `{${node.value}}`;
      // A long union may wrap onto the next line after a `|`
      const inner = raw.slice(1, -1).replace(/[ \t]*\r?\n[ \t]*/g, '');

      if (/^\s|\s$/.test(inner)) {
        file.message(
          `Remove the whitespace inside the braces: \`{${inner.trim()}}\``,
          node
        );
      }

      const expected = unionSpacing === 'always' ? ' | ' : '|';
      const unions = inner.match(UNION) ?? [];

      if (unions.some(separator => separator !== expected)) {
        file.message(
          unionSpacing === 'always'
            ? `Separate union members with \` | \`: \`{${inner.trim().replace(UNION, ' | ')}}\``
            : `Write unions without spaces around \`|\`: \`{${inner.trim().replace(UNION, '|')}}\``,
          node
        );
      }
    }
  },
});
