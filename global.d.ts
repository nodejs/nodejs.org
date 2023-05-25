declare global {
  // @TODO: Update this to use the correct type
  var __nextra_pageContext__: Record<string, any>;

  interface Window {
    startLegacyApp: Function;
  }
}

declare module '*.json' {
  const value: any;
  export default value;
}

export default global;
