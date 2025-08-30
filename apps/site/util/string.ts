export const getAcronymFromString = (str: string) =>
  [...(str.trim().match(/\b(\w)/g) || '')].join('').toUpperCase();

export const dashToCamelCase = (str: string) =>
  str
    .replace(/-([a-z])/g, (match, chr) => chr.toUpperCase())
    // remove leftover - which don't match the above regex. Like 'es-2015'
    .replace(/-/g, '')
    .replace(/^[A-Z]/, chr => chr.toLowerCase());
