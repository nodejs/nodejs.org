import dedent from 'dedent';

import type { NodeRelease } from '@/types';
import type { PackageManager } from '@/types/release';
import type { UserOS } from '@/types/userOS';

// @TODO: These snippets should be extracted to i18n (?)
export const getNodeDownloadSnippet = (release: NodeRelease, os: UserOS) => {
  const snippets: Record<PackageManager, string> = {
    NVM: '',
    FNM: '',
    BREW: '',
    DOCKER: '',
    CHOCO: '',
  };

  if (os === 'WIN' || os === 'MAC' || os === 'LINUX') {
    snippets.DOCKER = dedent`
      # NOTE:
      # Docker is not a Node.js package manager. Please ensure it is already installed
      # on your system. Follow official instructions at https://docs.docker.com/desktop/
      # Docker images are provided officially at https://github.com/nodejs/docker-node/

      # pulls the Node.js Docker image
      docker pull node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'}

      # verifies the right Node.js version is in the environment
      docker run node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'} node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      docker run node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'} npm -v # should print \`${release.npm}\``;
  }

  if (os === 'MAC' || os === 'LINUX') {
    snippets.NVM = dedent`
      # installs nvm (Node Version Manager)
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

      # download and install Node.js (you may need to restart the terminal)
      nvm install ${release.major}

      # verifies the right Node.js version is in the environment
      node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      npm -v # should print \`${release.npm}\``;

    snippets.FNM = dedent`
      # installs fnm (Fast Node Manager)
      curl -fsSL https://fnm.vercel.app/install | bash

      # download and install Node.js
      fnm use --install-if-missing ${release.major}

      # verifies the right Node.js version is in the environment
      node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      npm -v # should print \`${release.npm}\``;

    snippets.BREW = dedent`
      # NOTE:
      # Homebrew is not a Node.js package manager. Please ensure it is already installed
      # on your system. Follow official instructions at https://brew.sh/
      # Homebrew only supports installing major Node.js versions and might not support
      # the latest Node.js version from the ${release.major} release line.

      # download and install Node.js
      brew install node@${release.major}

      # verifies the right Node.js version is in the environment
      node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      npm -v # should print \`${release.npm}\``;
  }

  if (os === 'WIN') {
    snippets.FNM = dedent`
      # installs fnm (Fast Node Manager)
      winget install Schniz.fnm

      # download and install Node.js
      fnm use --install-if-missing ${release.major}

      # verifies the right Node.js version is in the environment
      node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      npm -v # should print \`${release.npm}\``;

    snippets.CHOCO = dedent`
      # NOTE:
      # Chocolatey is not a Node.js package manager. Please ensure it is already installed
      # on your system. Follow official instructions at https://chocolatey.org/
      # Chocolatey is not officially maintained by the Node.js project and might not
      # support the ${release.versionWithPrefix} version of Node.js

      # download and install Node.js
      choco install nodejs${release.isLts ? '-lts' : ''} --version="${release.version}"

      # verifies the right Node.js version is in the environment
      node -v # should print \`${release.major}\`

      # verifies the right NPM version is in the environment
      npm -v # should print \`${release.npm}\``;
  }

  return snippets;
};
