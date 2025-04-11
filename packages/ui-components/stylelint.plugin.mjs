import stylelint from 'stylelint';

const {
  createPlugin,
  utils: { report, ruleMessages },
} = stylelint;

const name = 'ui-components/one-tailwind-token-per-line';

const messages = ruleMessages(name, {
  className: tokens =>
    `Each line should contain only one Tailwind token; "${tokens}"`,
  spacing: tokens =>
    `Each class used with @apply should be indented by 2 spaces on a new line; ${tokens}`,
});

const meta = {
  url: 'https://github.com/nodejs/nodejs.org/blob/main/COLLABORATOR_GUIDE.md#styling-a-component',
  fixable: true,
};

/**
 * Adjusts the class names in the rule by cleaning and adding proper indentation.
 *
 * @param {Object} rule - The rule object containing the class names to be processed.
 * @param {string} rule.params - The class names as a string to be formatted.
 * @param {Object} rule.raws - The raw data of the rule.
 * @param {string} rule.raws.before - The raw string before to the @apply rule.
 * @returns {Object|null} The modified rule with properly formatted class names, or null if the rule is invalid.
 */
const indentClassNames = rule => {
  // Ensure that the rule contains necessary properties
  if (!rule || !rule.params || !rule.raws || !rule.raws.before) {
    return null;
  }

  const indent = ' '.repeat(rule.raws.before.length + 1);

  // Clean and split the class names
  const cleanedClasses = cleanClassNames(rule.params);

  // Apply the indentation and join the class names back together
  rule.params = applyIndentation(cleanedClasses, indent);

  return rule;
};

/**
 * Cleans the input string by removing unnecessary whitespace and newlines.
 *
 * @param {string} params - The class names string to be cleaned.
 * @returns {string} The cleaned class names string.
 */
const cleanClassNames = params => {
  return params
    .replace(/\n+/g, '') // Remove new lines
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim(); // Trim leading/trailing spaces
};

/**
 * Applies the correct indentation to each class name in the string.
 *
 * @param {string} classes - The cleaned class names as a string.
 * @param {string} indent - The string used for indentation.
 * @returns {string} The class names string with applied indentation.
 */
const applyIndentation = (classes, indent) => {
  return classes
    .split(' ') // Split into an array of class names
    .map(className => indent + className) // Add indentation to each class
    .join('\n') // Join with new lines
    .trim(); // Remove extra space at the end
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
        result,
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
