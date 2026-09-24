import { parseListItem } from '@doc-kit/core/utils/signature/parseList.mjs';
import parseSignature from '@doc-kit/core/utils/signature/parseSignature.mjs';

import { defineRule } from '../rule.mjs';
import { SIGNATURE_TYPES, getSignature } from '../utils/signature.mjs';

/**
 * @typedef Options
 * @property {boolean} reportUndeclared
 *   Also report documented parameters that the signature does not declare.
 */

// Typed list items that describe the entry rather than a parameter
const SPECIAL = new Set(['return', 'extends', 'type']);

/**
 * Groups consecutive entries documenting overloads of one function, the way
 * doc-kit's generators do, so a parameter list may serve every overload.
 *
 * @param {Array<import('../context.mjs').Entry>} entries
 */
const groupOverloads = entries => {
  const runs = [];

  for (const entry of entries) {
    if (!SIGNATURE_TYPES.has(entry.data.type)) {
      continue;
    }

    const previous = runs.at(-1)?.at(-1);
    const isOverload =
      previous &&
      entries.indexOf(previous) === entries.indexOf(entry) - 1 &&
      previous.depth === entry.depth &&
      previous.data.type === entry.data.type &&
      previous.data.name === entry.data.name;

    if (isOverload) {
      runs.at(-1).push(entry);
    } else {
      runs.push([entry]);
    }
  }

  return runs;
};

export default defineRule({
  name: 'signature-parameters',
  description:
    'Every parameter declared in a signature is documented in the typed list, as resolved by doc-kit',
  syntax: true,
  defaults: { reportUndeclared: false },
  /** @param {Options} options */
  run(context, { reportUndeclared }, file) {
    for (const run of groupOverloads(context.entries)) {
      const lists = run
        .map(entry => entry.nodes.find(node => context.infoOf(node)?.typed))
        .filter(Boolean);

      if (!lists.length) {
        continue;
      }

      // doc-kit's own reading of the items, shared across the overloads
      const items = lists.flatMap(list => list.children.map(parseListItem));
      const declared = new Set();

      for (const entry of run) {
        const signature = getSignature(entry);

        if (!signature) {
          continue;
        }

        // doc-kit resolves each declared parameter to a documented item (at
        // the same position, by name, or among nested properties), and
        // falls back to a bare `{ name }` when it finds none
        const { params } = parseSignature(signature.code.value, items);

        for (const param of params) {
          declared.add(param.name);

          if ('textRaw' in param) {
            continue;
          }

          // doc-kit keeps the `...` of a rest parameter, which the typed list
          // may leave out
          const rest =
            param.name.startsWith('...') &&
            items.find(item => item.name === param.name.slice(3));

          if (rest) {
            declared.add(rest.name);
          } else {
            file.message(
              `Parameter \`${param.name}\` is declared in the signature but not documented in the typed list`,
              signature.code
            );
          }
        }
      }

      if (!reportUndeclared) {
        continue;
      }

      for (const list of lists) {
        for (const item of list.children) {
          const { name } = parseListItem(item);

          if (name && !SPECIAL.has(name) && !declared.has(name)) {
            file.message(
              `\`${name}\` is documented but not declared in the signature`,
              item
            );
          }
        }
      }
    }
  },
});
