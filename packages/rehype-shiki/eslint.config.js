import baseConfig from '../../eslint.config.js';

export default baseConfig.concat([
  {
    files: ['src'],
    ignores: ['**/*.test.*', '**/*.stories.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
]);
