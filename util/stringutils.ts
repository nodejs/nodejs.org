export const getAcronymFromString = (str = '') =>
  str.length > 0
    ? [...(str.trim().match(/\b(\w)/g) || '')].join('').toUpperCase()
    : 'NA';
