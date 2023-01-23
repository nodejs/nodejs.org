declare global {
  // @TODO: Update this to use the correct type
  // eslint-disable-next-line no-unused-vars
  var __nextra_pageContext__: Record<string, any>;

  // eslint-disable-next-line no-unused-vars
  interface Window {
    startLegacyApp: Function;
  }
}

export default global;
