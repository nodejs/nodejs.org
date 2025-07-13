export const isStringArray = (
  values: Array<unknown>
): values is Array<string> =>
  Boolean(values[0] && typeof values[0] === 'string');

export const isValuesArray = <T>(values: Array<unknown>): values is Array<T> =>
  Boolean(values[0] && typeof values[0] === 'object' && 'value' in values[0]);
