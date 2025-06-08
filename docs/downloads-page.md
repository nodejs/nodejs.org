# Downloads Page

This guide explains how to add and modify installation methods and package managers for the Node.js downloads page.

## Table of Contents

- [Overview](#overview)
- [Adding Installation Methods](#adding-installation-methods)
  - [1. Update Installation Methods Configuration](#1-update-installation-methods-configuration)
    - [Configuration Properties](#configuration-properties)
  - [2. Create Installation Icon](#2-create-installation-icon)
  - [3. Add TypeScript Definitions](#3-add-typescript-definitions)
  - [4. Create Installation Snippet](#4-create-installation-snippet)
    - [Snippet Variables](#snippet-variables)
  - [5. Add Translation Key](#5-add-translation-key)
- [Adding Package Managers](#adding-package-managers)
- [Compatibility Configuration](#compatibility-configuration)
  - [Operating System Restrictions](#operating-system-restrictions)
  - [Version Restrictions](#version-restrictions)
  - [Platform/Architecture Restrictions](#platformarchitecture-restrictions)
  - [Combined Restrictions](#combined-restrictions)
- [Snippet Development](#snippet-development)
  - [Template Syntax](#template-syntax)
  - [Multi-line Instructions](#multi-line-instructions)

## Overview

The downloads page provides multiple ways for users to install Node.js across different operating systems and platforms. It supports:

- **Installation Methods**: Direct ways to install Node.js (official installers, package managers, etc.)
- **Package Managers**: Third-party package managers that can install Node.js
- **Platform Compatibility**: OS-specific, architecture-specific, and version-specific availability

## Adding Installation Methods

Installation methods are the primary ways users can install Node.js. Follow these steps to add a new method:

### 1. Update Installation Methods Configuration

Add your new method to `apps/site/util/downloadUtils.tsx`:

```javascript
// apps/site/util/downloadUtils.tsx
export const INSTALL_METHODS = [
  // ...existing methods...
  {
    iconImage: <InstallMethodIcons.YourIconImage width={16} height={16} />,
    url: 'https://example.com/install-guide',
    value: 'exampleMethod',
    recommended: false, // Only for official methods
    compatibility: {
      os: ['LINUX', 'MAC'], // Optional: OS restrictions
      semver: ['>=14.0.0'], // Optional: Version restrictions
      platform: ['x64', 'arm64'], // Optional: Architecture restrictions
    },
  },
];
```

#### Configuration Properties

- **`iconImage`**: React component for the installation method icon
- **`url`**: Link to official installation documentation
- **`value`**: Unique identifier for the installation method
- **`recommended`**: Boolean indicating if this is a recommended method (official methods only)
- **`compatibility`**: Optional object defining when this method is available

### 2. Create Installation Icon

Add the icon component to `@node-core/ui-components/Icons/InstallationMethod/`:

```tsx
// @node-core/ui-components/Icons/InstallationMethod/YourIconImage.tsx
import type { FC, SVGProps } from 'react';

const YourIconImage: FC<SVGProps<SVGSVGElement>> = props => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    {/* Your SVG content */}
  </svg>
);

export default YourIconImage;
```

Update the icon index file:

```tsx
// @node-core/ui-components/Icons/InstallationMethod/index.tsx
export { default as YourIconImage } from './YourIconImage';
// ...other exports
```

### 3. Add TypeScript Definitions

Update the type definitions in `apps/site/types/release.ts`:

```typescript
// apps/site/types/release.ts
export type InstallationMethod =
  | 'exampleMethod'
  | 'anotherMethod'
  | /* ...existing methods... */;

export const InstallationMethodLabel: Record<InstallationMethod, string> = {
  exampleMethod: 'Example Method',
  anotherMethod: 'Another Method',
  // ...existing methods...
};
```

### 4. Create Installation Snippet

Add installation instructions in `apps/site/snippets/en/download/`:

```bash
# apps/site/snippets/en/download/exampleMethod.bash
# Install Node.js ${props.version} using Example Method
curl -fsSL https://example.com/install.sh | bash -s -- ${props.version}

# Verify installation
node --version
npm --version
```

#### Snippet Variables

The snippet has access to a `props` variable of type `ReleaseContextType`:

- `props.version`: Current Node.js version (e.g., "20.0.0")
- `props.major`: Major version number
- `props.versionWithPrefix`: Version with "v" prefix (e.g., "v20.0.0")
- Additional release information

### 5. Add Translation Key

Add descriptive text in `packages/i18n/locales/en.json`:

```json
{
  "layouts": {
    "download": {
      "codeBox": {
        "platformInfo": {
          "exampleMethod": "Install Node.js using the Example Method package manager. This method provides automatic updates and easy version management."
        }
      }
    }
  }
}
```

## Adding Package Managers

Package managers follow the same process as installation methods but are added to the `PACKAGE_MANAGERS` configuration:

```javascript
// apps/site/util/downloadUtils.tsx
export const PACKAGE_MANAGERS = [
  // ...existing managers...
  {
    iconImage: <PackageManagerIcons.YourManager width={16} height={16} />,
    url: 'https://your-package-manager.com',
    value: 'yourManager',
    compatibility: {
      os: ['LINUX', 'MAC', 'WIN'],
      platform: ['x64', 'arm64'],
    },
  },
];
```

Follow the same steps as installation methods, but:

- Add icons to `@node-core/ui-components/Icons/PackageManager/`
- Create snippets in `apps/site/snippets/en/download/`
- Update `PackageManager` types instead of `InstallationMethod`

## Compatibility Configuration

The compatibility system allows fine-grained control over when installation methods appear:

### Operating System Restrictions

```javascript
compatibility: {
  os: ['LINUX', 'MAC', 'WIN'], // Available operating systems
}
```

Available OS values:

- `LINUX`: Linux distributions
- `MAC`: macOS
- `WIN`: Windows

### Version Restrictions

```javascript
compatibility: {
  semver: ['>=14.0.0', '<21.0.0'], // Supported Node.js versions
}
```

Uses semantic versioning ranges:

- `>=14.0.0`: Version 14.0.0 and higher
- `<21.0.0`: Below version 21.0.0
- `^18.0.0`: Compatible with 18.x.x
- `~20.1.0`: Compatible with 20.1.x

### Platform/Architecture Restrictions

```javascript
compatibility: {
  platform: ['x64', 'arm64', 'x86'], // Supported architectures
}
```

Available platforms:

- `x64`: 64-bit x86 architecture
- `arm64`: 64-bit ARM architecture
- `x86`: 32-bit x86 architecture

### Combined Restrictions

```javascript
compatibility: {
  os: ['LINUX', 'MAC'],
  semver: ['>=16.0.0'],
  platform: ['x64', 'arm64'],
}
```

This method would only appear for:

- Linux or macOS users
- Node.js version 16.0.0 or higher
- 64-bit x86 or ARM architectures

## Snippet Development

### Template Syntax

Snippets use JavaScript template literal syntax with access to release data:

```bash
# Basic usage
echo "Installing Node.js ${props.version}"

# Conditional content
${props.major >= 18 ? '# Node.js 18+ features available' : '# Using legacy Node.js'}

# Complex expressions
curl -o nodejs.tar.gz "https://nodejs.org/dist/v${props.version}/node-v${props.version}-linux-x64.tar.gz"
```

### Multi-line Instructions

```bash
# Download and install Node.js ${props.version}

# Step 1: Download the installer
wget https://example.com/node-${props.version}-installer.sh

# Step 2: Make it executable
chmod +x node-${props.version}-installer.sh

# Step 3: Run the installer
sudo ./node-${props.version}-installer.sh

# Step 4: Verify installation
node --version  # Should output: v${props.version}
npm --version
```
