// Enforces certain selectors to be only in camelCase notation
// We use these for id selectors and classname selectors
const onlyAllowCamelCaseRule = [
  /^(?:[a-z]+(?:[A-Z][a-z]*)*)$/,
  { message: s => `Expected '${s}' to be in camelCase` },
];

export default {
  extends: ['stylelint-config-recommended-scss'],
  plugins: ['stylelint-order', 'stylelint-selector-bem-pattern'],
  rules: {
    'order/properties-alphabetical-order': true,
    'no-descending-specificity': null,
    'selector-class-pattern': onlyAllowCamelCaseRule,
    'selector-id-pattern': onlyAllowCamelCaseRule,
    'scss/at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['tailwind', 'apply', 'define-mixin'] },
    ],
  },
};
