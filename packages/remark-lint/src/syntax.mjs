import { typeAnnotationFromMarkdown } from '@doc-kit/core/utils/type-annotations/mdast.mjs';
import { typeAnnotationSyntax } from '@doc-kit/core/utils/type-annotations/syntax.mjs';

/**
 * doc-kit's mdast extension, plus a record of each annotation's raw source on
 * the node, so that it can be serialized back exactly as it was written.
 *
 * (`mdast-util-from-markdown` overrides, rather than chains, handlers for the
 * same token, so the two must be combined into one handler.)
 *
 * @returns {import('mdast-util-from-markdown').Extension}
 */
const rawTypeAnnotationFromMarkdown = () => {
  const base = typeAnnotationFromMarkdown();

  return {
    ...base,
    exit: {
      ...base.exit,
      /**
       * @this {import('mdast-util-from-markdown').CompileContext}
       * @param {import('micromark-util-types').Token} token
       */
      typeAnnotation(token) {
        this.stack.at(-1).raw = this.sliceSerialize(token);
        base.exit.typeAnnotation.call(this, token);
      },
    },
  };
};

/**
 * Serializes annotations back to their source form, keeping the document
 * byte-for-byte stable through `remark-stringify` (which formatters rely on).
 *
 * @returns {import('mdast-util-to-markdown').Options}
 */
const rawTypeAnnotationToMarkdown = () => ({
  handlers: {
    /**
     * @param {{ raw?: string, value: string }} node
     */
    typeAnnotation: node => node.raw ?? `{${node.value}}`,
  },
});

/**
 * Teaches the parser doc-kit's `{Type}` annotation syntax (spec §8.1), so
 * rules see the exact `typeAnnotation` nodes doc-kit sees.
 *
 * @this {import('unified').Processor}
 */
export default function remarkTypeAnnotations() {
  const data = this.data();

  (data.micromarkExtensions ??= []).push(typeAnnotationSyntax());
  (data.fromMarkdownExtensions ??= []).push(rawTypeAnnotationFromMarkdown());
  (data.toMarkdownExtensions ??= []).push(rawTypeAnnotationToMarkdown());
}
