export default function deepMerge<Obj1 extends object, Obj2 extends object>(
  obj1: Obj1,
  obj2: Obj2
): Obj1 & Obj2 {
  const result = { ...obj1 } as Obj1 & Obj2;

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      if (typeof obj2[key] === 'object' && obj2[key] !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result[key] = deepMerge(result[key] as any, obj2[key] as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result[key] = obj2[key] as any;
      }
    }
  }

  return result;
}
