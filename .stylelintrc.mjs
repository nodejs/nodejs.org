// Enforces certain selectors to be only in camelCase notation
// such as class names, for example
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
    'scss/at-extend-no-missing-placeholder': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'selector-class-pattern': onlyAllowCamelCaseRule,
    'selector-id-pattern': onlyAllowCamelCaseRule,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
    'scss/at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['tailwind', 'apply'] },
    ],
  },
};
