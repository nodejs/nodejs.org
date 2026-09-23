import { defineRule } from '../rule.mjs';
import {
  getTypeParses,
  loadTypeMap,
  resolveAnnotation,
} from '../utils/types.mjs';

/**
 * @typedef Options
 * @property {Record<string, string> | string | URL} [typeMap]
 *   The type map (spec §8.3): an object, or a path or URL to a JSON file.
 * @property {Array<string>} ignore
 *   Type names that need not resolve.
 */

export default defineRule({
  name: 'type-annotation-resolution',
  description: 'Every type name in an annotation resolves to a documented type',
  syntax: true,
  defaults: { typeMap: undefined, ignore: [] },
  /** @param {Options} options */
  async run(context, options, file) {
    if (!context.typeAnnotations.length) {
      return;
    }

    const [typeMap, results] = await Promise.all([
      loadTypeMap(options.typeMap, file.cwd),
      getTypeParses(context),
    ]);

    results.forEach((result, index) => {
      const { node } = context.typeAnnotations[index];
      const { error, names } = resolveAnnotation(node.value, typeMap, result);

      // Unparseable values are reported by `type-annotation-syntax`
      if (error && !names.some(({ href }) => href)) {
        return;
      }

      const unresolved = new Set(
        names
          .filter(({ name, href }) => !href && !options.ignore.includes(name))
          .map(({ name }) => name)
      );

      for (const name of unresolved) {
        file.message(
          `Unknown type \`${name}\` in \`{${node.value}}\`; it does not resolve to a documented type`,
          node
        );
      }
    });
  },
});
