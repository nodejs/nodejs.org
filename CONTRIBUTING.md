# Node.js Website Contributing Guide

## Table of Contents

- [Quick Start](#quick-start)
- [Code of Conduct](#code-of-conduct)
  - [Developer's Certificate of Origin 1.1](#developers-certificate-of-origin-11)
- [Ways to Contribute](#ways-to-contribute)
  - [For All Contributors](#for-all-contributors)
  - [For Developers](#for-developers)
- [Development Workflow](#development-workflow)
  - [1. Set Up Your Environment](#1-set-up-your-environment)
  - [2. Make Your Changes](#2-make-your-changes)
  - [3. Test Your Changes](#3-test-your-changes)
  - [4. Submit Your Contribution](#4-submit-your-contribution)
- [Documentation Structure](#documentation-structure)
- [Getting Help](#getting-help)
- [Project Maintainers](#project-maintainers)
- [License](#license)

---

Thank you for your interest in contributing to the Node.js Website! This guide will help you get started with contributing to our project.

## Quick Start

New to contributing? Start here:

1. **[Getting Started](./docs/getting-started.md)** - Set up your development environment and make your first contribution
2. **[Code Style](./docs/code-style.md)** - Learn our coding standards and formatting guidelines
3. **[Adding Pages](./docs/adding-pages.md)** - Create new pages and content for the website

## Code of Conduct

Before contributing, please read and follow our [Code of Conduct](https://github.com/nodejs/node/blob/HEAD/CODE_OF_CONDUCT.md).

### Developer's Certificate of Origin 1.1

```
By contributing to this project, I certify that:

- (a) The contribution was created in whole or in part by me and I have the right to
  submit it under the open source license indicated in the file; or
- (b) The contribution is based upon previous work that, to the best of my knowledge,
  is covered under an appropriate open source license and I have the right under that
  license to submit that work with modifications, whether created in whole or in part
  by me, under the same open source license (unless I am permitted to submit under a
  different license), as indicated in the file; or
- (c) The contribution was provided directly to me by some other person who certified
  (a), (b) or (c) and I have not modified it.
- (d) I understand and agree that this project and the contribution are public and that
  a record of the contribution (including all personal information I submit with it,
  including my sign-off) is maintained indefinitely and may be redistributed consistent
  with this project or the open source license(s) involved.

```

## Ways to Contribute

### For All Contributors

- **Report Issues**: Found a bug or have a feature request? [Open an issue](https://github.com/nodejs/nodejs.org/issues/new/choose)
- **Improve Documentation**: Help make our docs clearer and more comprehensive
- **Add Content**: Create new learn articles, blog posts, or improve existing content
- **Fix Bugs**: Look for issues labeled [`good first issue`](https://github.com/nodejs/nodejs.org/labels/good%20first%20issue)
- **Translate Content**: Help make Node.js documentation accessible worldwide

### For Developers

- **Create Components**: Build reusable React components following our [component guidelines](./docs/creating-components.md)
- **Write Tests**: Improve test coverage with our [testing guidelines](./docs/writing-tests.md)
- **Enhance Features**: Add new functionality to improve user experience

## Development Workflow

### 1. Set Up Your Environment

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/nodejs.org.git
cd nodejs.org

# Install dependencies
pnpm install --frozen-lockfile

# Start development server
node --run dev
```

For detailed setup instructions, see [Getting Started](./docs/getting-started.md).

### 2. Make Your Changes

- **New Pages**: Follow our [page creation guide](./docs/adding-pages.md)
- **Components**: See [creating components](./docs/creating-components.md)
- **Styling**: Follow our [code style guidelines](./docs/code-style.md)

### 3. Test Your Changes

```bash
# Format and lint code
node --run format

# Run tests
node --run test

# Test build
node --run build
```

### 4. Submit Your Contribution

1. **Create a branch**: `git checkout -b your-feature-branch`
2. **Commit changes**: Follow our [commit guidelines](./docs/code-style.md#commit-guidelines)
3. **Push to your fork**: `git push origin your-feature-branch`
4. **Open a Pull Request**: Use our [pull request template](.github/PULL_REQUEST_TEMPLATE.md)

## Documentation Structure

Our documentation is organized in the [`docs/`](./docs/) directory, so check out it's **[README](./docs/README.md)** for navigation.

## Getting Help

- **Questions?** Start a [Discussion](https://github.com/nodejs/nodejs.org/discussions)
- **Found a bug?** [Open an issue](https://github.com/nodejs/nodejs.org/issues/new/choose)
- **Need clarification?** Comment on existing issues or PRs
- **Want to chat?** Join the Node.js community on [OpenJS Foundation Slack](https://openjs-foundation.slack.com/)

## Project Maintainers

This project is maintained by the [Node.js Website Team](https://github.com/nodejs/nodejs.org#readme). For questions about governance or high-level project direction, you can:

- Mention `@nodejs/nodejs-website` in issues or PRs
- Contact team members directly for guidance
- Escalate to the [Node.js Technical Steering Committee](https://github.com/nodejs/TSC) if needed

## License

By contributing to this project, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).

---

**Ready to contribute?** Start with our [Getting Started guide](./docs/getting-started.md) and join the Node.js community in building better web experiences for developers worldwide! 🚀
