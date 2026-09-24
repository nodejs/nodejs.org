import { IGNORE_STABILITY_STEMS } from '@doc-kit/core/generators/metadata/constants.mjs';

import { defineRule } from '../rule.mjs';

/**
 * @typedef Options
 * @property {Array<string>} types
 *   The entry types whose typed list doc-kit lifts into structured data, and
 *   which therefore must precede the prose.
 * @property {Array<string>} ignoreFiles
 *   File stems whose stability blockquotes are definitions, not indicators.
 */

export default defineRule({
  name: 'entry-order',
  description:
    'Within an entry, YAML metadata comes first, then at most one stability indicator, then the typed list, then prose',
  syntax: true,
  defaults: {
    types: ['method', 'ctor', 'classMethod', 'property', 'event', 'class'],
    ignoreFiles: IGNORE_STABILITY_STEMS,
  },
  /** @param {Options} options */
  run(context, { types, ignoreFiles }, file) {
    const hasHeadings = context.entries.length > 1;

    // YAML metadata: immediately after the heading
    for (const { node, kind, entry, nested } of context.comments) {
      if (kind !== 'yaml') {
        continue;
      }

      if (nested) {
        file.message(
          'YAML metadata must be a top-level comment directly after its heading',
          node
        );
      } else if (!entry.heading) {
        if (hasHeadings) {
          file.message(
            'YAML metadata must follow the heading it annotates; move it below the document title',
            node
          );
        }
      } else if (context.blockedBy(entry, node, context.isComment)) {
        file.message(
          'YAML metadata must immediately follow its heading, before the stability indicator, typed list and prose',
          node
        );
      }
    }

    // Stability: after the YAML, before everything else, at most once
    if (!ignoreFiles.includes(file.stem)) {
      const seen = new Set();

      for (const { node, valid, entry, nested } of context.stability) {
        if (!valid || nested) {
          continue;
        }

        if (seen.has(entry)) {
          file.message(
            'Entries should have at most one stability indicator; doc-kit keeps only the last one',
            node
          );
        } else if (context.blockedBy(entry, node, context.isComment)) {
          file.message(
            'Stability indicators must come right after the YAML metadata, before the typed list and prose',
            node
          );
        }

        seen.add(entry);
      }
    }

    // A `type` directive or YAML field overrides the heading's classification
    // (`<!--type=misc-->` under a `Class:` heading documents an options bag)
    const typeOf = entry => {
      const override = context.comments.find(
        comment =>
          comment.entry === entry &&
          !comment.nested &&
          ((comment.kind === 'directive' && comment.key === 'type') ||
            (comment.kind === 'yaml' && comment.yaml?.type))
      );

      if (!override) {
        return entry.data.type;
      }

      return override.kind === 'directive'
        ? override.value.trim()
        : override.yaml.type;
    };

    // Typed list: after the stability indicator, before the prose
    for (const entry of context.entries) {
      if (!types.includes(typeOf(entry))) {
        continue;
      }

      const list = entry.nodes.find(node => context.infoOf(node)?.typed);

      if (list && context.blockedBy(entry, list, context.isMetadata)) {
        file.message(
          'The typed list must come right after the stability indicator (or YAML metadata), before any prose',
          list
        );
      }
    }
  },
});
