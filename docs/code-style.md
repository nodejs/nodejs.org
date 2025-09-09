# Code Style Guidelines

This document outlines the coding standards and formatting guidelines for the Node.js website project.

## Table of Contents

- [Commit Guidelines](#commit-guidelines)
  - [Commit Message Format](#commit-message-format)
  - [Commit Signing](#commit-signing)
  - [Examples](#examples)
- [Pre-commit Hooks](#pre-commit-hooks)
- [CSS Guidelines](#css-guidelines)
  - [CSS Module Guidelines](#css-module-guidelines)
  - [Example CSS Module](#example-css-module)
  - [Tailwind Configuration](#tailwind-configuration)
- [JavaScript/TypeScript Guidelines](#javascripttypescript-guidelines)
  - [Import Standards](#import-standards)
  - [Component Guidelines](#component-guidelines)
  - [Example Component Structure](#example-component-structure)
- [File Naming Conventions](#file-naming-conventions)
  - [Components](#components)
  - [General Files](#general-files)
- [Linting and Formatting](#linting-and-formatting)
  - [Automatic Formatting](#automatic-formatting)
  - [IDE Configuration](#ide-configuration)
- [Code Organization](#code-organization)
  - [File Structure Standards](#file-structure-standards)
  - [Import Organization](#import-organization)
- [Documentation Standards](#documentation-standards)
- [Performance Guidelines](#performance-guidelines)

## Commit Guidelines

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

- Commit messages must include a "type" as described in Conventional Commits
- Commit messages **must** start with a capital letter
- Commit messages **must not** end with a period `.`

### Commit Signing

Commits should be signed. You can read more about [Commit Signing](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) in the GitHub documentation.

### Examples

✅ **Good commit messages:**

```
feat: Add new component for download statistics
fix: Resolve navigation menu accessibility issue
docs: Update contributing guidelines
```

❌ **Bad commit messages:**

```
update stuff
Fixed bug.
added new feature
```

## Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) for Git pre-commit hooks to ensure code quality standards are met before commits.

## CSS Guidelines

We use [PostCSS](https://postcss.org/) and [Tailwind CSS](https://tailwindcss.com/) for styling. All component styles should be written in CSS Modules.

### CSS Module Guidelines

- Use camelCase for defining CSS classes
- Use Tailwind's `@apply` directive to apply utility classes
- Define one Tailwind utility class per line for better readability
- Avoid plain CSS styles and tokens - use Tailwind utilities instead
- Only write CSS within CSS Modules, avoid inline styles in JavaScript
- Refer to [Tailwind's documentation](https://tailwindcss.com/docs/functions-and-directives#apply-directive) for more details

### Example CSS Module

```css
.myComponent {
  @apply flex
    flex-col
    items-center
    justify-center
    rounded-lg
    bg-white
    p-4
    shadow-md;
}

.componentTitle {
  @apply mb-4
    text-2xl
    font-bold
    text-gray-900;
}
```

## JavaScript/TypeScript Guidelines

### Import Standards

- Avoid importing `React` directly - only import specific modules you need
- Use `import type` for type-only imports
- Prefer named imports over default imports where possible

### Component Guidelines

- Use `FC` type from React for component definitions
- Use `FC<PropsWithChildren<MyComponentProps>>` when using children prop
- Prefix prop types with the component name
- Always use default exports for React components
- Avoid direct DOM/Web API access in components - use hooks or utilities instead

### Example Component Structure

```tsx
import type { FC } from 'react';

import styles from './index.module.css';

type MyComponentProps = {
  title: string;
  isVisible?: boolean;
};

const MyComponent: FC<MyComponentProps> = ({ title, isVisible = true }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.myComponent}>
      <h2 className={styles.componentTitle}>{title}</h2>
    </div>
  );
};

export default MyComponent;
```

## File Naming Conventions

### Components

- Component folders: `PascalCase`
- Component files: `index.tsx` (or `PascalCase.tsx` if a subdirectory is not needed)
- Style files: `index.module.css`
- Test files: `__tests__/index.test.mjs`
- Story files: `index.stories.tsx`

### General Files

- Use `kebab-case` for most file names (i.e. documentation)
- Use `camelCase` for utility functions and configuration files
- Use `PascalCase` only for React components

## Linting and Formatting

### Automatic Formatting

Run these commands to ensure your code meets our standards:

```bash
pnpm format       # Formats and fixes lints for entire codebase
pnpm lint         # Run linter for all files
pnpm lint:fix     # Attempt to fix linting errors
pnpm prettier     # Run prettier for JavaScript files
pnpm prettier:fix # Fix style errors
```

### IDE Configuration

We recommend using Visual Studio Code with these extensions:

- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - CSS linting
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind autocomplete
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - JavaScript/TypeScript linting
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting

The repository includes a `.vscode` directory with recommended settings that will be automatically applied if you use VS Code.

## Code Organization

### File Structure Standards

- Keep related files together in component folders
- Use index files for clean imports
- Group similar functionality in dedicated directories
- Follow the established patterns in the codebase

### Import Organization

Organize imports in this order:

1. Node.js built-in modules
2. External library imports (Including `@node-core/*`)
3. Relative imports (`./*`, `../*`, `#specifier/`)
4. Type-only imports at the end of each given section

```tsx
import { readFile } from 'node:fs/promises';

import { SomeComponent } from '@node-core/ui-components/Common/SomeComponent';
import type { FC } from 'react';

import { myHook } from '../hooks/myHook';
import type { MyComponentProps } from './types';
```

## Documentation Standards

- Use JSDoc comments for complex functions and utilities
- Document component props with TypeScript interfaces
- Include examples in Storybook for UI components
- Keep README files updated for significant changes

## Performance Guidelines

- Minimize bundle size by importing only what you need
- Use dynamic imports for large components when appropriate
- Optimize images and assets
- Follow React best practices for rendering performance
