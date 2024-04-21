import dedent from 'dedent';

import type { NodeRelease } from '@/types';
import type { PackageManager } from '@/types/release';
import type { UserOS } from '@/types/userOS';

export const getNodeDownloadSnippet = (release: NodeRelease, os: UserOS) => {
  const snippets: Record<PackageManager, string> = {
    NVM: '',
    BREW: '',
    DOCKER: '',
    CHOCO: '',
  };

  switch (true) {
    case os === 'WIN' || os === 'MAC' || os === 'LINUX':
      snippets.DOCKER = dedent`
      # pulls the Node.js Docker image
      docker pull node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'}

      # verifies the right Node.js version is in the environment
      docker run node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'} node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      docker run node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'} npm -v # should print \`${release.npm}\``;
    // eslint-disable-next-line no-fallthrough
    case os === 'MAC' || os === 'LINUX':
      snippets.NVM = dedent`
        # installs NVM (Node Version Manager)
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

        # download and install Node.js
        nvm install ${release.major}

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
    // eslint-disable-next-line no-fallthrough
    case os === 'WIN':
      snippets.CHOCO = dedent`
      # download and install Node.js
      choco install nodejs${release.isLts ? '-lts' : ''} --version="${release.version}"

      # verifies the right Node.js version is in the environment
      node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      npm -v # should print \`${release.npm}\``;
    // eslint-disable-next-line no-fallthrough
    default:
      break;
  }

  return snippets;
};
