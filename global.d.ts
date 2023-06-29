declare global {
  interface Window {
    startLegacyApp: Function;
  }
}

declare module '*.json' {
  const value: any;
  export default value;
}

export default global;
