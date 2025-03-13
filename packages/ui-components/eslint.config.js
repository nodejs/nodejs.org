import importX from 'eslint-plugin-import-x';
import react from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import baseConfig from '../../eslint.config.js';

export default tseslint.config(
  ...baseConfig,
  {
    extends: [
      react.configs.flat['jsx-runtime'],
      ...tseslint.configs.recommended,
      importX.flatConfigs.typescript,
    ],
    files: ['**/*.{js,mjs,ts,tsx}'],
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-require-imports': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'react/no-unescaped-entities': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
          message:
            'Default React import not allowed since we use the TypeScript jsx-transform. If you need a global type that collides with a React named export (such as `MouseEvent`), try using `globalThis.MouseHandler`',
        },
        {
          selector:
            "ImportDeclaration[source.value='react'] :matches(ImportNamespaceSpecifier)",
          message:
            'Named * React import is not allowed. Please import what you need from React with Named Imports',
        },
      ],
    },
  },
  {
    files: ['.storybook/**', '**/*.mjs', '**/*.test.*'],
    rules: {
      'no-relative-import-paths/no-relative-import-paths': 'off',
    },
  },
  {
    files: ['components/**/*.stories.tsx'],
    extends: [...storybook.configs['flat/recommended']],
  }
);
