const VALID_KEYS = ['added', 'napiVersion', 'deprecated', 'removed', 'changes'];

export default (yaml, report, validKeys = VALID_KEYS, prefix = '') => {
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
};
