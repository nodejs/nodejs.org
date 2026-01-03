export const isStringArray = (
  values: Array<unknown>
): values is Array<string> =>
  Boolean(values[0] && typeof values[0] === 'string');

export const isValuesArray = <T>(values: Array<unknown>): values is Array<T> =>
  Boolean(values[0] && typeof values[0] === 'object' && 'value' in values[0]);

export const mapValues = (values: Array<unknown>) => {
  let mappedValues = values;

  if (isStringArray(mappedValues)) {
    mappedValues = mappedValues.map(value => ({
      label: value,
      value,
    }));
  }

  if (isValuesArray(mappedValues)) {
    return [{ items: mappedValues }];
  }

  return mappedValues;
};
