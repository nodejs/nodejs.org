export default new Proxy(
  {},
  { get: (_, key) => (typeof key === 'string' ? key : undefined) }
);
