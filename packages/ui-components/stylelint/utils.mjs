/**
 * Adjusts the class names in the rule by cleaning and adding proper indentation.
 *
 * @param {Object} rule - The rule object containing the class names to be processed.
 * @param {string} rule.params - The class names as a string to be formatted.
 * @param {Object} rule.raws - The raw data of the rule.
 * @param {string} rule.raws.before - The raw string before to the @apply rule.
 * @returns {Object|null} The modified rule with properly formatted class names, or null if the rule is invalid.
 */
export const indentClassNames = rule => {
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
export const cleanClassNames = params => {
  return params
    .replace(/[\n\r]+/g, '') // Remove new lines
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
export const applyIndentation = (classes, indent) => {
  return classes
    .split(' ') // Split into an array of class names
    .map(className => indent + className) // Add indentation to each class
    .join('\n') // Join with new lines
    .trim(); // Remove extra space at the end
};
