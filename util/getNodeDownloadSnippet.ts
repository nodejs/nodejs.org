import dedent from 'dedent';

import type { NodeRelease } from '@/types';
import type { PackageManager } from '@/types/release';
import type { UserOS } from '@/types/userOS';

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

      # download and install Node.js
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
      # download and install Node.js
      choco install nodejs${release.isLts ? '-lts' : ''} --version="${release.version}"

      # verifies the right Node.js version is in the environment
      node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      npm -v # should print \`${release.npm}\``;
  }

  return snippets;
};
