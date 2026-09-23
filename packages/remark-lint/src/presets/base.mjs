/**
 * The base preset: general Markdown style for the Node.js organization
 * (READMEs, the website, guides). It does not enforce the doc-kit
 * specification; see `./api.mjs` for that.
 */
export default {
  settings: {
    tightDefinitions: true,
    emphasis: '_',
    bullet: '-',
    rule: '-',
  },

  rules: {
    // Headings
    'no-multiple-toplevel-headings': true,

    // Code
    'no-shell-dollars': true,

    // Links and definitions
    'definition-spacing': true,
    'final-definition': true,
    'no-duplicate-definitions': true,
    'no-shortcut-reference-image': true,
    'no-shortcut-reference-link': true,
    'no-undefined-references': true,
    'link-targets': {
      basePaths: ['pages/en', 'pages', 'public', '.'],
      fragments: 'self',
      slugger: 'github',
    },

    // File names
    'no-file-name-consecutive-dashes': true,
    'no-file-name-outer-dashes': true,
  },
};
