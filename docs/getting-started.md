# Getting Started

This guide will help you set up your development environment and make your first contribution to the Node.js website.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up Your Development Environment](#setting-up-your-development-environment)
- [Making Your First Contribution](#making-your-first-contribution)
- [Available CLI Commands](#available-cli-commands)
  - [Development Commands](#development-commands)
  - [Code Quality Commands](#code-quality-commands)
  - [Testing Commands](#testing-commands)
  - [Other Commands](#other-commands)
- [Next Steps](#next-steps)
- [Getting Help](#getting-help)

## Prerequisites

- Node.js (latest LTS version recommended)
- [pnpm](https://pnpm.io/installation) package manager
- Git
- A GitHub account

## Setting Up Your Development Environment

1. **Fork and Clone the Repository**

   Click the fork button in the top right to clone the [Node.js Website Repository](https://github.com/nodejs/nodejs.org/fork)

   ```bash
   git clone git@github.com:<YOUR_GITHUB_USERNAME>/nodejs.org.git # SSH
   git clone https://github.com/<YOUR_GITHUB_USERNAME>/nodejs.org.git # HTTPS
   gh repo clone <YOUR_GITHUB_USERNAME>/nodejs.org # GitHub CLI
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd nodejs.org
   ```

3. **Set Up Remote Tracking**

   ```bash
   git remote add upstream git@github.com:nodejs/nodejs.org.git # SSH
   git remote add upstream https://github.com/nodejs/nodejs.org.git # HTTPS
   gh repo sync nodejs/nodejs.org # GitHub CLI
   ```

4. **Install Dependencies**

   ```bash
   pnpm install --frozen-lockfile
   ```

5. **Start the Development Server**

   ```bash
   pnpm dev # starts a development environment at http://localhost:3000/
   ```

## Making Your First Contribution

1. **Create a New Branch**

   ```bash
   git checkout -b name-of-your-branch
   ```

2. **Make Your Changes**
   - For repository structure guidance, see [Technologies](./technologies.md#structure-of-this-repository)
   - For adding new pages, see [Adding Pages](./adding-pages.md)
   - For component development, see [Creating Components](./creating-components.md)

3. **Test Your Changes**

   ```bash
   pnpm format # runs linting and formatting
   pnpm test # runs all tests
   ```

4. **Keep Your Branch Updated**

   ```bash
   git fetch upstream
   git merge upstream/main
   ```

5. **Commit and Push Your Changes**

   ```bash
   git add .
   git commit -m "describe your changes"
   git push -u origin name-of-your-branch
   ```

   > [!TIP]
   > Follow our [commit guidelines](./code-style.md#commit-guidelines) for commit message format.

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Follow our [pull request guidelines](./collaborator-guide.md#pull-request-policy)

## Available CLI Commands

### Development Commands

- `pnpm dev` - Start local development server
- `pnpm build` - Build for production (Vercel deployments)
- `pnpm deploy` - Build for export (Legacy server)
- `pnpm start` - Start server with built content

### Code Quality Commands

- `pnpm lint` - Run linter for all files
- `pnpm lint:fix` - Attempt to fix linting errors
- `pnpm prettier` - Run prettier for JavaScript files
- `pnpm prettier:fix` - Attempt to fix style errors
- `pnpm format` - Format and fix lints for entire codebase

### Testing Commands

- `pnpm test` - Run all tests locally
- `pnpm test:unit` - Run unit tests only
- `pnpm test:ci` - Run tests with CI output format

### Other Commands

- `pnpm scripts:release-post -- --version=vXX.X.X --force` - Generate release post
- `pnpm storybook` - Start Storybook development server
- `pnpm storybook:build` - Build Storybook for publishing

## Next Steps

- Read about our [code style guidelines](./code-style.md)
- Learn about [creating components](./creating-components.md)
- Understand our [testing practices](./writing-tests.md)
- Review the [technologies we use](./technologies.md)

## Getting Help

- Open a [Discussion](https://github.com/nodejs/nodejs.org/discussions) for questions
- Check existing [Issues](https://github.com/nodejs/nodejs.org/issues) for known problems
- Review our [Code of Conduct](https://github.com/nodejs/node/blob/HEAD/CODE_OF_CONDUCT.md)
