export const parseApiDocsVersion = (version: string | string[]): string =>
  typeof version === 'string' ? version : version.join(', ');
