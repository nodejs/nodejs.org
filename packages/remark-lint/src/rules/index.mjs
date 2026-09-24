import remarkLintDefinitionSpacing from 'remark-lint-definition-spacing';
import remarkLintFencedCodeFlag from 'remark-lint-fenced-code-flag';
import remarkLintFileExtension from 'remark-lint-file-extension';
import remarkLintFinalDefinition from 'remark-lint-final-definition';
import remarkLintFirstHeadingLevel from 'remark-lint-first-heading-level';
import remarkLintMaximumLineLength from 'remark-lint-maximum-line-length';
import remarkLintNoDuplicateDefinitions from 'remark-lint-no-duplicate-definitions';
import remarkLintNoFileNameArticles from 'remark-lint-no-file-name-articles';
import remarkLintNoFileNameConsecutiveDashes from 'remark-lint-no-file-name-consecutive-dashes';
import remarkLintNoFileNameOuterDashes from 'remark-lint-no-file-name-outer-dashes';
import remarkLintNoMultipleToplevelHeadings from 'remark-lint-no-multiple-toplevel-headings';
import remarkLintNoShellDollars from 'remark-lint-no-shell-dollars';
import remarkLintNoShortcutReferenceImage from 'remark-lint-no-shortcut-reference-image';
import remarkLintNoShortcutReferenceLink from 'remark-lint-no-shortcut-reference-link';
import remarkLintNoUndefinedReferences from 'remark-lint-no-undefined-references';
import remarkLintNoUnusedDefinitions from 'remark-lint-no-unused-definitions';
import remarkLintProhibitedStrings from 'remark-lint-prohibited-strings';

import deprecations from './deprecations.mjs';
import directivePlacement from './directive-placement.mjs';
import directiveSyntax from './directive-syntax.mjs';
import directiveValue from './directive-value.mjs';
import documentDescription from './document-description.mjs';
import entryOrder from './entry-order.mjs';
import fencedCodeMeta from './fenced-code-meta.mjs';
import headingClassification from './heading-classification.mjs';
import headingDepth from './heading-depth.mjs';
import headingMultipleForms from './heading-multiple-forms.mjs';
import linkTargets from './link-targets.mjs';
import manPageReference from './man-page-reference.mjs';
import noFrontmatter from './no-frontmatter.mjs';
import noRedundantStability from './no-redundant-stability.mjs';
import noTypedListInProse from './no-typed-list-in-prose.mjs';
import orderedDefinitions from './ordered-definitions.mjs';
import preferReferenceLinks from './prefer-reference-links.mjs';
import requiredDirectives from './required-directives.mjs';
import signatureParameters from './signature-parameters.mjs';
import signatureSyntax from './signature-syntax.mjs';
import stabilitySyntax from './stability-syntax.mjs';
import tagCommentSyntax from './tag-comment-syntax.mjs';
import typeAnnotationResolution from './type-annotation-resolution.mjs';
import typeAnnotationStyle from './type-annotation-style.mjs';
import typeAnnotationSyntax from './type-annotation-syntax.mjs';
import typedListDefault from './typed-list-default.mjs';
import typedListItem from './typed-list-item.mjs';
import typedListPrefix from './typed-list-prefix.mjs';
import yamlChanges from './yaml-changes.mjs';
import yamlCommentSyntax from './yaml-comment-syntax.mjs';
import yamlFields from './yaml-fields.mjs';
import yamlVersions from './yaml-versions.mjs';

/**
 * @typedef RuleMeta
 * @property {string} name
 * @property {string} description
 * @property {boolean} external
 *   Whether the rule is a bundled `remark-lint-*` plugin (configured with
 *   that plugin's own option value) or a `node-core` rule (configured with
 *   an options object that merges with its defaults).
 * @property {boolean} [syntax]
 *   Whether the rule needs `{Type}` annotations parsed.
 * @property {Record<string, unknown>} [defaults]
 *
 * @typedef RuleEntry
 * @property {import('unified').Plugin} plugin
 * @property {RuleMeta} meta
 */

/**
 * @param {import('unified').Plugin} plugin
 * @param {string} description
 * @returns {(name: string) => RuleEntry}
 */
const external = (plugin, description) => name => ({
  plugin,
  meta: { name, description, external: true },
});

/**
 * @param {import('unified').Plugin & { meta: RuleMeta }} plugin
 * @returns {(name: string) => RuleEntry}
 */
const internal = plugin => () => ({ plugin, meta: plugin.meta });

/**
 * Every rule, keyed by the name used to configure it.
 *
 * @type {Record<string, RuleEntry>}
 */
export const RULES = Object.fromEntries(
  Object.entries({
    // Document structure
    'first-heading-level': external(
      remarkLintFirstHeadingLevel,
      'The first heading is the depth-1 document title'
    ),
    'document-description': internal(documentDescription),
    'no-frontmatter': internal(noFrontmatter),
    'required-directives': internal(requiredDirectives),
    'directive-placement': internal(directivePlacement),
    'directive-syntax': internal(directiveSyntax),
    'directive-value': internal(directiveValue),
    'tag-comment-syntax': internal(tagCommentSyntax),
    'entry-order': internal(entryOrder),

    // Headings and signatures
    'heading-depth': internal(headingDepth),
    'no-multiple-toplevel-headings': external(
      remarkLintNoMultipleToplevelHeadings,
      'There is at most one depth-1 heading'
    ),
    'heading-classification': internal(headingClassification),
    'heading-multiple-forms': internal(headingMultipleForms),
    'signature-syntax': internal(signatureSyntax),
    'signature-parameters': internal(signatureParameters),

    // YAML metadata
    'yaml-comment-syntax': internal(yamlCommentSyntax),
    'yaml-fields': internal(yamlFields),
    'yaml-versions': internal(yamlVersions),
    'yaml-changes': internal(yamlChanges),

    // Stability indicators
    'stability-syntax': internal(stabilitySyntax),
    'no-redundant-stability': internal(noRedundantStability),

    // Type annotations
    'type-annotation-syntax': internal(typeAnnotationSyntax),
    'type-annotation-resolution': internal(typeAnnotationResolution),
    'type-annotation-style': internal(typeAnnotationStyle),

    // Typed lists
    'typed-list-item': internal(typedListItem),
    'typed-list-prefix': internal(typedListPrefix),
    'typed-list-default': internal(typedListDefault),
    'no-typed-list-in-prose': internal(noTypedListInProse),

    // Code
    'fenced-code-flag': external(
      remarkLintFencedCodeFlag,
      'Fenced code blocks have a known language identifier'
    ),
    'fenced-code-meta': internal(fencedCodeMeta),
    'no-shell-dollars': external(
      remarkLintNoShellDollars,
      'Shell code blocks do not prefix every line with `$`'
    ),

    // Links and definitions
    'link-targets': internal(linkTargets),
    'man-page-reference': internal(manPageReference),
    'prefer-reference-links': internal(preferReferenceLinks),
    'no-undefined-references': external(
      remarkLintNoUndefinedReferences,
      'Every reference has a definition'
    ),
    'no-shortcut-reference-link': external(
      remarkLintNoShortcutReferenceLink,
      'Reference links are collapsed or full, not shortcut'
    ),
    'no-shortcut-reference-image': external(
      remarkLintNoShortcutReferenceImage,
      'Reference images are collapsed or full, not shortcut'
    ),
    'definition-spacing': external(
      remarkLintDefinitionSpacing,
      'Definition labels do not contain consecutive whitespace'
    ),
    'no-duplicate-definitions': external(
      remarkLintNoDuplicateDefinitions,
      'Definition labels are unique'
    ),
    'no-unused-definitions': external(
      remarkLintNoUnusedDefinitions,
      'Every definition is referenced'
    ),
    'ordered-definitions': internal(orderedDefinitions),
    'final-definition': external(
      remarkLintFinalDefinition,
      'Definitions are collected at the end of the document'
    ),

    // Files and terminology
    'file-extension': external(
      remarkLintFileExtension,
      'Files use the `.md` extension'
    ),
    'no-file-name-articles': external(
      remarkLintNoFileNameArticles,
      'File names do not start with articles'
    ),
    'no-file-name-consecutive-dashes': external(
      remarkLintNoFileNameConsecutiveDashes,
      'File names do not contain consecutive dashes'
    ),
    'no-file-name-outer-dashes': external(
      remarkLintNoFileNameOuterDashes,
      'File names do not start or end with dashes'
    ),
    'maximum-line-length': external(
      remarkLintMaximumLineLength,
      'Lines do not exceed the maximum length'
    ),
    'prohibited-strings': external(
      remarkLintProhibitedStrings,
      'Terminology follows the style guide'
    ),

    // Node.js specifics
    deprecations: internal(deprecations),
  }).map(([name, create]) => [name, create(name)])
);
