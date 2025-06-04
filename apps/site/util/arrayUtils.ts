/**
 * Splits an array into smaller chunks of a specified size.
 */
export const chunk = <T>(array: Array<T>, size: number): Array<Array<T>> => {
  // Number of chunks needed
  const count = Math.ceil(array.length / size);

  // Create an array of chunks by slicing the original array
  return Array.from({ length: count }, (_, index) =>
    array.slice(index * size, (index + 1) * size)
  );
};
