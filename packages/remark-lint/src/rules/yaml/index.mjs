import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';
import { parse } from 'yaml';

import orderedYamlKeys from './ordered-yaml-keys.mjs';
import validateChanges from './validate-changes.mjs';
import validateVersions from './validate-versions.mjs';

const YAML_HTML_COMMENT_RE = /^<!--\s?YAML\s*\n/;
const HTML_COMMENT_OPEN = '<!--';
const HTML_COMMENT_CLOSE = '-->';
const RULES = [orderedYamlKeys, validateVersions, validateChanges];

/**
 * @callback YAMLRule
 * @param {Record<string, unknown>} yaml - The YAML object to validate.
 * @param {(message: string) => void} report - Reporting function
 * @param {import('../../api.mjs').Options} options - The options.
 */

/**
 * Determine if a node is a YAML-bearing HTML comment.
 * @param {import('unist').Node} node
 */
const isYamlHtmlComment = node =>
  node.type === 'html' && YAML_HTML_COMMENT_RE.test(node.value);

/**
 * Lints YAML embedded inside HTML comments in Markdown AST.
 * @type {import('unified-lint-rule').Rule}
 */
const yamlComments = (tree, vfile, options) => {
  visit(tree, isYamlHtmlComment, node => {
    const trimmed = node.value.trim();

    // Consistency check for "<!-- " (space after open)
    if (trimmed[HTML_COMMENT_OPEN.length] !== ' ') {
      vfile.message("Expected ' ' after '<!--'", node);
    }

    if (!trimmed.endsWith(HTML_COMMENT_CLOSE)) {
      vfile.message('YAML comment is not properly closed with "-->"', node);
      return;
    }

    // "#" comments out the first line ("<!-- YAML"), and we remove the trailing "-->"
    const parsed = parse(`#${trimmed.slice(0, -HTML_COMMENT_CLOSE.length)}`);

    const report = (...args) => vfile.message(...args, node);

    RULES.forEach(rule => rule(parsed, report, options));
  });
};

export default lintRule('node-core:yaml-comments', yamlComments);
