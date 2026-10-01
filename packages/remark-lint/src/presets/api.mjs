import base from './base.mjs';

// Terminology enforced by the Node.js documentation style guide
export const PROHIBITED_STRINGS = [
  { yes: 'End-of-Life' },
  { no: 'filesystem', yes: 'file system' },
  { yes: 'GitHub' },
  { no: 'hostname', yes: 'host name' },
  { yes: 'JavaScript' },
  { no: '[Ll]ong[ -][Tt]erm [Ss]upport', yes: 'Long Term Support' },
  { no: 'Node', yes: 'Node.js', ignoreNextTo: '-API' },
  { yes: 'Node.js' },
  { no: 'Node[Jj][Ss]', yes: 'Node.js' },
  { no: "Node\\.js's?", yes: 'the Node.js' },
  { no: '[Nn]ote that', yes: '<nothing>' },
  { yes: 'RFC' },
  { no: '[Rr][Ff][Cc]\\d+', yes: 'RFC <number>' },
  { yes: 'TypeScript' },
  { yes: 'Unix' },
  { yes: 'Valgrind' },
  { yes: 'V8' },
  { yes: 'npm' },
];

/**
 * The API preset: everything in the base preset, plus every rule needed for
 * a document to conform to the doc-kit specification, and the Node.js API
 * documentation conventions.
 */
export default {
  settings: {
    ...base.settings,
    bullet: '*',
  },

  rules: {
    ...base.rules,

    // Bundled rules that differ from the base preset
    'no-unused-definitions': true,
    'no-file-name-articles': true,
    'file-extension': 'md',
    'maximum-line-length': 120,
    'prohibited-strings': PROHIBITED_STRINGS,
    'link-targets': {
      basePaths: ['.'],
      fragments: 'all',
      slugger: ['doc-kit', 'github'],
    },

    // §3 Document structure
    'first-heading-level': 1,
    'document-description': true,
    'no-frontmatter': true,
    'required-directives': true,
    'directive-placement': true,
    'directive-syntax': true,
    'directive-value': true,
    'tag-comment-syntax': true,
    'entry-order': true,

    // §4 Headings and §5 signatures
    'heading-depth': true,
    'heading-classification': true,
    'heading-multiple-forms': true,
    'signature-syntax': true,
    'signature-parameters': true,

    // §6 YAML metadata
    'yaml-comment-syntax': true,
    'yaml-fields': true,
    'yaml-versions': true,
    'yaml-changes': true,

    // §7 Stability indicators
    'stability-syntax': true,
    'no-redundant-stability': true,

    // §8 Type annotations
    'type-annotation-syntax': true,
    'type-annotation-resolution': true,
    'type-annotation-style': true,

    // §9 Typed lists
    'typed-list-item': true,
    'typed-list-prefix': true,
    'typed-list-default': true,
    'no-typed-list-in-prose': true,

    // §10 Code blocks
    'fenced-code-meta': true,

    // §11 Links
    'ordered-definitions': true,
    'man-page-reference': true,
    'prefer-reference-links': false,

    // Node.js specifics
    deprecations: true,
  },
};
