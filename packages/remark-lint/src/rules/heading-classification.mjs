import { DOC_API_HEADING_TYPES } from '@doc-kit/core/generators/metadata/constants.mjs';

import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {boolean} staticMethodDepth
 *   Whether static methods must sit one level below their class.
 */

const PLACEHOLDER = /^<.+>$/;

// Headings that are trying to be one of the prefixed forms, however spelled
const LOOSE = {
  event: /^\s*event\s*:/i,
  class: /^\s*class\s*:/i,
  classMethod: /^\s*static\s*method\s*:/i,
};

// The exact prefix each form starts with (doc-kit matches case-insensitively)
const PREFIX = {
  event: /^Event: +$/,
  class: /^Class: +$/,
  classMethod: /^Static method: +$/,
};

const FORM = {
  event: "Event headings take the form Event: `'name'`",
  class: 'Class headings take the form Class: `Name`',
  classMethod:
    'Static method headings take the form Static method: `Class.method(args)`',
  ctor: 'Constructor headings take the form `new Class(args)`',
};

const PREFIXED = /^(Event|Class|Static method):\s*(.+)$/i;

// Bare properties (`foo.bar`) are left alone when unwrapped: prose such as
// `Node.js` or `CMake.js` is indistinguishable from a property access
const UNAMBIGUOUS = new Set([
  'method',
  'ctor',
  'event',
  'class',
  'classMethod',
]);

/**
 * Whether a heading text would classify as an API entry if its identifier
 * were wrapped in a code span.
 *
 * @param {string} text
 */
const classifiesWhenWrapped = text => {
  const prefixed = PREFIXED.exec(text);
  const candidate = prefixed
    ? `${prefixed[1]}: \`${prefixed[2]}\``
    : `\`${text}\``;

  return DOC_API_HEADING_TYPES.some(
    ({ type, regex }) => UNAMBIGUOUS.has(type) && regex.test(candidate)
  );
};

/**
 * The last segment of a (possibly dotted) identifier.
 *
 * @param {string} name
 */
const lastSegment = name => name.split(' ')[0].split('.').at(-1);

export default defineRule({
  name: 'heading-classification',
  description:
    "API entry headings use the exact forms doc-kit classifies: `` `method()` ``, `` `new Class()` ``, Event: `'name'`, Class: `Name`, Static method: `Class.method()`",
  defaults: { staticMethodDepth: true },
  /** @param {Options} options */
  run(context, { staticMethodDepth }, file) {
    for (const entry of context.entries) {
      const { heading, data } = entry;

      if (!heading) {
        continue;
      }

      const [first, second] = heading.children;

      // Unwrapped identifiers
      if (
        !data.type &&
        !heading.children.some(node => node.type === 'inlineCode') &&
        classifiesWhenWrapped(data.text.trim())
      ) {
        file.message(
          'Wrap the API identifier in backticks so the heading is classified as an entry',
          heading
        );
        continue;
      }

      // Constructors: doc-kit's `ctor` classification decides the form
      if (first?.type === 'inlineCode' && /^\s*new\b/i.test(first.value)) {
        if (data.type !== 'ctor') {
          file.message(FORM.ctor, heading);
        } else if (!/^[A-Z]/.test(lastSegment(data.name))) {
          file.message(
            `Constructed class names begin with an uppercase letter; saw \`${lastSegment(data.name)}\``,
            first
          );
        }

        continue;
      }

      // Prefixed forms: doc-kit's classification decides the overall shape
      const kind = Object.keys(LOOSE).find(key => LOOSE[key].test(data.text));

      if (!kind) {
        continue;
      }

      if (data.type !== kind) {
        file.message(FORM[kind], heading);
        continue;
      }

      // The spec requires the literal (cased) prefix
      if (first.type !== 'text' || !PREFIX[kind].test(first.value)) {
        file.message(
          `${kind === 'classMethod' ? 'Static method' : kind === 'class' ? 'Class' : 'Event'} headings start with the literal prefix \`${FORM[kind].match(/(Event|Class|Static method):/)[0]}\``,
          heading
        );
      }

      if (kind === 'event') {
        const name = second.value;

        if (!PLACEHOLDER.test(name) && !/^'[^']+'$/.test(name)) {
          file.message(
            `Event names should be single-quoted inside the code span: Event: \`'${name.replace(/^'|'$/g, '')}'\``,
            second
          );
        }
      } else if (kind === 'class') {
        if (!/^[A-Z]/.test(lastSegment(data.name))) {
          file.message(
            `Class names should begin with an uppercase letter; saw \`${lastSegment(data.name)}\``,
            second
          );
        }
      } else if (staticMethodDepth) {
        let ancestor = entry.parent;

        while (ancestor && ancestor.data.type !== 'class') {
          ancestor = ancestor.parent;
        }

        if (!ancestor) {
          file.message(
            'Static methods should be nested under their `Class:` heading',
            heading
          );
        } else if (entry.depth !== ancestor.depth + 1) {
          file.message(
            `Static methods should be one heading level below their class (expected depth ${ancestor.depth + 1}, saw ${entry.depth})`,
            heading
          );
        }
      }
    }
  },
});
