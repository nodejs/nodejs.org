import { flatConfigs } from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  ...tseslint.configs.recommended,
  flatConfigs.typescript,
  {
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
];
