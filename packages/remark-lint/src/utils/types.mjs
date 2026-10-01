import {
  lookupTypeName,
  resolveTypeReference,
} from '@doc-kit/core/generators/metadata/utils/transformers.mjs';

import { loadTypeMap } from './type-map.mjs';

/** @type {WeakMap<object, Promise<Array<{ error?: boolean, identifiers?: Array<{ text: string, lookup: string }> }>>>} */
const parses = new WeakMap();

/**
 * Parses every type annotation of a document under the TypeScript grammar
 * (spec §8.2), once per document, in a single batch. The parser (SWC) is
 * loaded lazily, so documents without annotations never pay for it.
 *
 * @param {import('../context.mjs').Context} context
 */
export const getTypeParses = context => {
  if (!parses.has(context.tree)) {
    parses.set(
      context.tree,
      context.typeAnnotations.length
        ? import('@doc-kit/core/generators/metadata/utils/resolveTypes.mjs').then(
            ({ parseTypeValues }) =>
              parseTypeValues(
                context.typeAnnotations.map(({ node }) => node.value)
              )
          )
        : Promise.resolve([])
    );
  }

  return parses.get(context.tree);
};

/**
 * Splits a value that failed to parse into `|`-separated display names (e.g.
 * `HTTP/2 Headers Object`), resolving each on its own, as doc-kit does.
 *
 * @param {string} value
 * @param {Record<string, string>} typeMap
 * @returns {Array<{ name: string, href: string }>}
 */
export const resolveDisplayNames = (value, typeMap) =>
  Array.from(value.matchAll(/(?:[^|]|\|\|)+/g), ([part]) => {
    const name = part.trim().replace(/(\[\])+$/, '');

    return { name, href: name && resolveTypeReference(name, typeMap) };
  }).filter(({ name }) => name);

/**
 * Resolves one annotation to the names it contains and their links, the way
 * doc-kit's `resolveLinks` does.
 *
 * @param {string} value
 * @param {Record<string, string>} typeMap
 * @param {{ error?: boolean, identifiers?: Array<{ text: string, lookup: string }> }} result
 * @returns {{ whole: boolean, error: boolean, names: Array<{ name: string, href: string }> }}
 */
export const resolveAnnotation = (value, typeMap, result) => {
  if (lookupTypeName(value, typeMap)) {
    return { whole: true, error: false, names: [] };
  }

  if (result.error) {
    return {
      whole: false,
      error: true,
      names: resolveDisplayNames(value, typeMap),
    };
  }

  return {
    whole: false,
    error: false,
    names: result.identifiers.map(({ text, lookup }) => ({
      name: text,
      href: resolveTypeReference(lookup, typeMap),
    })),
  };
};

export { loadTypeMap, lookupTypeName, resolveTypeReference };
