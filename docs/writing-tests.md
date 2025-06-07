# Writing Tests

This guide covers testing practices for the Node.js website, including unit tests, end-to-end tests, and Storybook documentation.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Unit Testing](#unit-testing)
- [End-to-End Testing](#end-to-end-testing)
  - [E2E Test Guidelines](#e2e-test-guidelines)
  - [E2E Test Structure](#e2e-test-structure)
- [Visual Testing](#visual-testing)
- [Visual Regression Testing](#visual-regression-testing)
- [Running Tests](#running-tests)
  - [Local Development](#local-development)
  - [Continuous Integration](#continuous-integration)

## Testing Philosophy

Each new feature or bug fix should be accompanied by appropriate tests to ensure code quality and prevent regressions. We use multiple testing approaches:

- **Unit Tests**: Test individual functions, utilities, and components in isolation
- **End-to-End Tests**: Test complete user workflows and critical paths
- **Visual Tests**: Automated visual regression testing via Storybook and Chromatic

## Unit Testing

We use [`node:test`](https://nodejs.org/api/test.html) as our test runner and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for React component testing.

```javascript
// components/MyComponent/__tests__/index.test.mjs
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { render, screen } from '@testing-library/react';
import MyComponent from '../index.js';

describe('MyComponent', () => {
  it('renders with default props', () => {
    render(<MyComponent title="Test Title" />);

    const heading = screen.getByRole('heading', { name: /test title/i });
    assert(isVisible(heading));
  });
});
```

## End-to-End Testing

We use [Playwright](https://playwright.dev/) for end-to-end testing to ensure the entire application works correctly from a user's perspective.

### E2E Test Guidelines

- Tests are located in `apps/site/tests/e2e`
- Focus on user flows and critical application paths
- Write resilient tests that can handle minor UI changes
- Prioritize testing functionality over exact visual appearance
- Run tests against the built application to reflect production

### E2E Test Structure

```javascript
// apps/site/tests/e2e/navigation.test.js
import { test, expect } from '@playwright/test';

test.describe('Website Navigation', () => {
  test('user can navigate to download page', async ({ page }) => {
    await page.goto('/');

    // Click the download link in navigation
    await page.getByRole('link', { name: /download/i }).click();

    // Verify we're on the download page
    await expect(page).toHaveURL(/.*\/download/);
    await expect(
      page.getByRole('heading', { name: /download node\.js/i })
    ).toBeVisible();
  });

  test('search functionality works correctly', async ({ page }) => {
    await page.goto('/');

    // Open search
    await page.getByRole('button', { name: /search/i }).click();

    // Type search query
    await page.getByRole('searchbox').fill('getting started');

    // Verify search results appear
    await expect(page.getByText(/search results/i)).toBeVisible();
  });
});
```

## Visual Testing

[Storybook](https://storybook.js.org/) serves as both documentation and visual testing for our React components.

```tsx
// components/MyComponent/index.stories.tsx
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import MyComponent from '@node-core/ui-components/Common/MyComponent';

type Story = StoryObj<typeof MyComponent>;
type Meta = MetaObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    title: 'Default Title',
    isVisible: true,
  },
};

export const Hidden: Story = {
  args: {
    title: 'Hidden Component',
    isVisible: false,
  },
};

export const WithLongTitle: Story = {
  args: {
    title: 'This is a very long title that demonstrates text wrapping behavior',
    isVisible: true,
  },
};

export default {
  component: MyComponent,
  title: 'Common/MyComponent',
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: 'Controls component visibility',
    },
  },
} as Meta;
```

## Visual Regression Testing

Visual regression testing is automatically handled by [Chromatic](https://www.chromatic.com/) integration with Storybook:

- Runs automatically on pull requests
- Detects visual changes in components
- Provides approval workflow for intentional changes
- Ensures consistent visual appearance across updates

## Running Tests

### Local Development

```bash
# Run all tests
pnpm test

# Run only unit tests
pnpm test:unit

# Run tests with CI formatting
pnpm test:ci

# Start Storybook for visual testing
pnpm storybook

# Build Storybook for deployment
pnpm storybook:build
```

### Continuous Integration

Tests run automatically on:

- Pull request creation and updates
- Pushes to main branch
- Manual workflow triggers

CI checks must pass before pull requests can be merged.
