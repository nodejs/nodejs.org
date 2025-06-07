# Creating Components

This guide covers best practices for creating React components in the Node.js website project.

## Table of Contents

- [Component Architecture](#component-architecture)
- [Component Guidelines](#component-guidelines)
  - [Framework-Agnostic Components](#framework-agnostic-components)
  - [Website-Specific Components](#website-specific-components)
- [Component Structure](#component-structure)
  - [File Organization](#file-organization)
  - [Sub-components](#sub-components)
- [Component Implementation](#component-implementation)
  - [Basic Component Template](#basic-component-template)
  - [Component with Children](#component-with-children)
- [Styling Components](#styling-components)
  - [CSS Modules](#css-modules)
  - [Style Guidelines](#style-guidelines)
  - [Responsive Design](#responsive-design)
- [TypeScript Best Practices](#typescript-best-practices)
  - [Prop Types](#prop-types)
  - [Import Patterns](#import-patterns)
- [Component Domain Organization](#component-domain-organization)
- [Testing Components](#testing-components)
  - [Unit Tests](#unit-tests)
  - [Storybook Stories](#storybook-stories)

## Component Architecture

The website uses a dual-package architecture for React components:

- **`@node-core/ui-components`**: Reusable, framework-agnostic UI components
- **`apps/site/components`**: Website-specific components that use Next.js features

## Component Guidelines

### Framework-Agnostic Components

Generic UI components should be placed in `@node-core/ui-components`:

```tsx
// @node-core/ui-components/Common/Button/index.tsx
import type { FC, ButtonHTMLAttributes } from 'react';
import styles from './index.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
};

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className,
  ...props
}) => (
  <button
    className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
```

### Website-Specific Components

Components that need Next.js features should be in `apps/site/components`, such as components that require routing.

## Component Structure

### File Organization

Each component should have its own folder with this structure:

```
ComponentName/
├── index.tsx                 # Component implementation
├── index.module.css          # Component styles
├── index.stories.tsx         # Storybook stories (ui-components only)
└── __tests__/
    └── index.test.mjs        # Unit tests
```

### Sub-components

If a component has sub-components, organize them hierarchically:

```
ComponentName/
├── index.tsx
├── index.module.css
├── SubComponent/
│   ├── index.tsx
│   └── index.module.css
└── AnotherSubComponent/
    ├── index.tsx
    └── index.module.css
```

## Component Implementation

### Basic Component Template

```tsx
import type { FC } from 'react';
import styles from './index.module.css';

type MyComponentProps = {
  title: string;
  description?: string;
  isVisible?: boolean;
};

const MyComponent: FC<MyComponentProps> = ({
  title,
  description,
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default MyComponent;
```

### Component with Children

```tsx
import type { FC, PropsWithChildren } from 'react';
import styles from './index.module.css';

type CardProps = PropsWithChildren<{
  title: string;
  variant?: 'default' | 'highlighted';
}>;

const Card: FC<CardProps> = ({ title, variant = 'default', children }) => (
  <div className={`${styles.card} ${styles[variant]}`}>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.content}>{children}</div>
  </div>
);

export default Card;
```

## Styling Components

### CSS Modules

Use CSS Modules for component styling:

```css
/* index.module.css */
.container {
  @apply flex
    flex-col
    gap-4
    rounded-lg
    bg-white
    p-6
    shadow-sm;
}

.title {
  @apply text-xl
    font-semibold
    text-gray-900;
}

.description {
  @apply leading-relaxed
    text-gray-600;
}
```

### Style Guidelines

- Use camelCase for CSS class names
- Apply one Tailwind utility per line for readability
- Use `@apply` directive for Tailwind utilities
- Avoid plain CSS properties when Tailwind alternatives exist
- Keep styles scoped to the component

### Responsive Design

```css
.container {
  @apply grid
    grid-cols-1
    gap-4
    md:grid-cols-2
    lg:grid-cols-3;
}

.title {
  @apply text-lg
    md:text-xl
    lg:text-2xl;
}
```

## TypeScript Best Practices

### Prop Types

```tsx
// Prefix prop types with component name
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  onClick?: () => void;
};

// Extend HTML attributes when appropriate
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

// Use PropsWithChildren for components that accept children
type ContainerProps = PropsWithChildren<{
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}>;
```

### Import Patterns

```tsx
// Type-only imports
import type { FC, HTMLAttributes, MouseEvent } from 'react';

// Regular imports
import { useState, useEffect } from 'react';
import { Button } from '@node-core/ui-components';

// Avoid importing React itself
// ❌ import React from 'react';
// ✅ import type { FC } from 'react';
```

## Component Domain Organization

Components should be organized by domain (where they're used):

1. UI Components (`@node-core/ui-components`)

When you need Next.js functionality in a UI component, use a wrapper, such as the one shown below:

```tsx
// Base component (@node-core/ui-components)
const BaseNavLink: FC<BaseLinkProps> = ({ href, isActive, children }) => (
  <a href={href} className={`${styles.link} ${isActive ? styles.active : ''}`}>
    {children}
  </a>
);

// Wrapper component (apps/site/components)
const NavLink: FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <BaseNavLink href={href} isActive={isActive}>
      {children}
    </BaseNavLink>
  );
};
```

2. Site Components (`apps/site/components`)

## Testing Components

### Unit Tests

```javascript
// __tests__/index.test.mjs
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../index.js';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    assert(isVisible(screen.getByRole('button', { name: /click me/i }));
  });

  it('applies variant styles correctly', () => {
    render(<Button variant="secondary">Test</Button>);
    const button = screen.getByRole('button');
    assert(button.getAttribute('class').includes('secondary'))
  });
});
```

### Storybook Stories

```tsx
// index.stories.tsx
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Button from '@node-core/ui-components/Common/Button';

type Story = StoryObj<typeof Button>;
type Meta = MetaObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'Loading...',
    disabled: true,
  },
};

export default {
  component: Button,
  title: 'Common/Button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} as Meta;
```
