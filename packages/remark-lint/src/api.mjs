import remarkLintFencedCodeFlag from 'remark-lint-fenced-code-flag';
import remarkLintMaximumLineLength from 'remark-lint-maximum-line-length';
import remarkLintNoUnusedDefinitions from 'remark-lint-no-unused-definitions';
import remarkLintProhibitedStrings from 'remark-lint-prohibited-strings';
import remarkLintUnorderedListMarkerStyle from 'remark-lint-unordered-list-marker-style';

import basePreset from './index.mjs';
import duplicateStabilityNodes from './rules/duplicate-stability-nodes.mjs';
import hashedSelfReference from './rules/hashed-self-reference.mjs';
import orderedReferences from './rules/ordered-references.mjs';
import requiredMetadata from './rules/required-metadata.mjs';
import yamlComments from './rules/yaml/index.mjs';

/**
 * @typedef {Object} Options
 * @property {Array<string>} releasedVersions The released versions, for validating the YAML
 */

/**
 * @param {Options} options
 */
export default (options = {}) => ({
  settings: {
    ...basePreset.settings,
    bullet: '*',
  },
  plugins: [
    ...basePreset.plugins,

    // Internal Rules
    ...[
      duplicateStabilityNodes,
      yamlComments,
      hashedSelfReference,
      orderedReferences,
      requiredMetadata,
    ].map(plugin => [plugin, options]),

    // External Rules
    remarkLintNoUnusedDefinitions,
    [remarkLintFencedCodeFlag, { allowEmpty: false }],
    [remarkLintMaximumLineLength, 120],
    [remarkLintUnorderedListMarkerStyle, '*'],
    [
      remarkLintProhibitedStrings,
      [
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
      ],
    ],
  ],
});
