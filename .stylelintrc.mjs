// These are all the custom `@` tokens that we use within our custom PostCSS plugins
const CUSTOM_AT_TOKENS = ['tailwind', 'apply', 'define-mixin', 'mixin'];

// Enforces certain selectors to be only in camelCase notation
// We use these for id selectors and classname selectors
const ONLY_ALLOW_CAMEL_CASE_SELECTORS = [
  /^(?:[a-z]+(?:[A-Z][a-z]*)*)$/,
  { message: s => `Expected '${s}' to be in camelCase` },
];

export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-selector-bem-pattern'],
  rules: {
    'order/properties-alphabetical-order': true,
    'no-descending-specificity': null,
    'selector-class-pattern': ONLY_ALLOW_CAMEL_CASE_SELECTORS,
    'selector-id-pattern': ONLY_ALLOW_CAMEL_CASE_SELECTORS,
    'at-rule-no-unknown': [true, { ignoreAtRules: CUSTOM_AT_TOKENS }],
    'media-feature-range-notation': 'prefix',
    'import-notation': 'string',
  },
};
