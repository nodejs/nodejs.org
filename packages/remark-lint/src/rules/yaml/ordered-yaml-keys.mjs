/**
 * Default allowed keys and their required order at the top level.
 * Order matters for validation.
 */
export const DEFAULT_VALID_KEYS = [
  'added',
  'napiVersion',
  'deprecated',
  'removed',
  'changes',
];

/**
 * Validate that:
 * - Only valid keys are present
 * - Keys appear in the expected order (relative order respected)
 *
 * @type {import('./index.mjs').YAMLRule}
 * @param {readonly string[]} [validKeys=DEFAULT_VALID_KEYS] - Allowed keys in the expected order.
 * @param {string} [prefix=''] - Message prefix for context.
 */
export default function orderedYamlKeys(
  yaml,
  report,
  _,
  validKeys = DEFAULT_VALID_KEYS,
  prefix = ''
) {
  if (!yaml || typeof yaml !== 'object' || Array.isArray(yaml)) {
    return;
  }

  const keys = Object.keys(yaml);

  // Check for invalid keys
  const invalidKeys = keys.filter(key => !validKeys.includes(key));
  if (invalidKeys.length > 0) {
    report(`${prefix}Invalid key(s) found: ${invalidKeys.join(', ')}`);
  }

  // Check key order
  let lastIndex = -1;
  for (const key of keys) {
    const index = validKeys.indexOf(key);

    if (index === -1) {
      // Non-validated keys are ignored for ordering, since
      // they were already reported as invalid above
      continue;
    }

    if (index < lastIndex) {
      report(
        `${prefix}Key "${key}" is out of order. Expected order: ${validKeys.join(', ')}`
      );
      break;
    }
    lastIndex = index;
  }
}
