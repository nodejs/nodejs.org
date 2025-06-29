import stylelint from 'stylelint';

import { indentClassNames } from './utils.mjs';

const {
  createPlugin,
  utils: { report, ruleMessages },
} = stylelint;

const name = 'nodejs/one-utility-class-per-line';

const messages = ruleMessages(name, {
  className: classNames =>
    `Each line should contain only one Tailwind utility class; "${classNames}"`,
  spacing: classNames =>
    `Each utility class used with @apply should be indented by 2 spaces on a new line; ${classNames}`,
});

const meta = {
  url: 'https://github.com/nodejs/nodejs.org/blob/main/COLLABORATOR_GUIDE.md#styling-a-component',
  fixable: true,
};

/** @type {import('stylelint').Rule} */
const rule = () => (root, result) => {
  root.walkAtRules('apply', rule => {
    if (!rule.params.includes(' ')) {
      // If there are no spaces in the params, we don't need to check anything
      return;
    }

    // Since we use 2 spaces for indentation, each line in the apply rule
    // should be indented with two extra whitespaces.
    const classes = rule.params.split(`${rule.raws.before}  `);
    const classNames = classes.join('');

    // Check if the params contain any spaces
    if (classNames.includes(' ')) {
      if (classNames.includes('\n')) {
        return report({
          ruleName: name,
          result: result,
          message: messages.spacing(JSON.stringify(rule.params)),
          node: rule,
          fix: indentClassNames(rule),
        });
      }

      return report({
        ruleName: name,
        result: result,
        message: messages.className(rule.params),
        node: rule,
        fix: indentClassNames(rule),
      });
    }
  });
};

rule.ruleName = name;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(name, rule);
