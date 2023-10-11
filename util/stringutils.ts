export const getAcronymFromString = (str: string) =>
  [...(str.trim().match(/\b(\w)/g) || '')].join('').toUpperCase();
