const mockBaseUrl = new URL('mocks/', import.meta.url);

const mockEntries = [
  ['github-slugger', 'github-slugger.mjs'],
  ['next-intl', 'next-intl.jsx'],
  ['next-router', 'next-router.mjs'],
];

function getMockFile(specifier) {
  for (let i = 0; i < mockEntries.length; i++) {
    const [prefix, file] = mockEntries[i];
    const len = prefix.length;
    if (
      specifier === prefix ||
      (specifier.startsWith(prefix) && specifier[len] === '/')
    ) {
      return file;
    }
  }
  return null;
}

export async function resolve(specifier, ctx, nextResolve) {
  const mockFile = getMockFile(specifier);
  if (mockFile) {
    return {
      format: 'module',
      url: new URL(mockFile, mockBaseUrl).href,
      shortCircuit: true,
    };
  }

  return nextResolve(specifier);
}
