import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';
import { parse } from 'yaml';

import orderedYamlKeys from './ordered-yaml-keys.mjs';
import validateChanges from './validate-changes.mjs';
import validateVersions from './validate-versions.mjs';

const isYaml = node =>
  node.type === 'html' && node.value.match(/^<!--\s?YAML\n/);

const rules = [orderedYamlKeys, validateVersions, validateChanges];

const yamlComments = (tree, vfile) => {
  visit(tree, isYaml, node => {
    if (!node.value.startsWith('<!-- ')) {
      vfile.message("Expected ' ' after '<!--'", node);
    }

    // "#" comments out the first line, and we remove the last
    // three characters: "-->"
    const yaml = parse(`#${node.value.slice(0, -3)}`);
    const report = (...args) => vfile.message(...args, node);

    rules.forEach(rule => rule(yaml, report));
  });
};

export default lintRule('node-core:yaml-comments', yamlComments);
