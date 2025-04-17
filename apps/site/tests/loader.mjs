// Map of module specifier prefixes to their corresponding mock files
const mockEntries = [
  ['next-intl', new URL('mocks/next-intl.jsx', import.meta.url).href],
  ['next-router', new URL('mocks/next-intl.jsx', import.meta.url).href],
];

/**
 * Returns the corresponding mock file for a given module specifier, if matched.
 *
 * @param {string} specifier - Module name or path being imported.
 * @returns {string|null} - File name of the mock module or null if no match.
 */
function getMockFile(specifier) {
  const entry = mockEntries.find(
    ([prefix]) => specifier === prefix || specifier.startsWith(prefix + '/')
  );
  return entry?.[1] ?? null;
}

/**
 * Node.js custom module resolution hook to inject mock modules.
 *
 * @type {import('node:module').ResolveHook}
 */
export async function resolve(specifier, ctx, nextResolve) {
  const mockFile = getMockFile(specifier);

  if (mockFile) {
    return {
      format: 'module',
      url: mockFile,
      shortCircuit: true,
    };
  }

  return nextResolve(specifier);
}
