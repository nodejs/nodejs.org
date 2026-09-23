import { defineRule } from '../rule.mjs';
import {
  getTypeParses,
  loadTypeMap,
  resolveAnnotation,
  resolveTypeReference,
} from '../utils/types.mjs';

/**
 * @typedef Options
 * @property {Record<string, string> | string | URL} [typeMap]
 *   The type map (spec §8.3): an object, or a path or URL to a JSON file.
 */

// `<Type>` as inline HTML, or escaped in text
const INLINE_HTML = /^<([A-Za-z_$][\w$.]*(?:\[\])*)>$/;
const IN_TEXT = /<([A-Za-z_$][\w$.]*(?:\[\])*)>/g;

export default defineRule({
  name: 'type-annotation-syntax',
  description:
    'Every `{Type}` annotation is a valid TypeScript type expression, and types are never written as `<Type>`',
  syntax: true,
  defaults: { typeMap: undefined },
  /** @param {Options} options */
  async run(context, options, file) {
    // `<Type>` candidates: inline HTML tags and escaped brackets in text
    const angled = [];

    for (const comment of context.comments) {
      const match = comment.nested && INLINE_HTML.exec(comment.node.value);

      if (match) {
        angled.push([comment.node, match[1]]);
      }
    }

    for (const { node } of context.paragraphs) {
      for (const child of node.children) {
        if (child.type === 'text' && child.value.includes('<')) {
          for (const [, name] of child.value.matchAll(IN_TEXT)) {
            angled.push([child, name]);
          }
        }
      }
    }

    if (!context.typeAnnotations.length && !angled.length) {
      return;
    }

    const [typeMap, results] = await Promise.all([
      loadTypeMap(options.typeMap, file.cwd),
      getTypeParses(context),
    ]);

    results.forEach((result, index) => {
      const { node } = context.typeAnnotations[index];
      const { error, names } = resolveAnnotation(node.value, typeMap, result);

      // Like doc-kit, an unparseable value is only an error when it is not a
      // union of display names from the type map either
      if (error && !names.some(({ href }) => href)) {
        file.message(
          `Invalid type annotation \`{${node.value}}\`: not a TypeScript type expression`,
          node
        );
      }
    });

    for (const [node, name] of angled) {
      if (resolveTypeReference(name.replace(/(\[\])+$/, ''), typeMap)) {
        file.message(
          `Wrap types in curly braces: \`{${name}}\`, not \`<${name}>\``,
          node
        );
      }
    }
  },
});
