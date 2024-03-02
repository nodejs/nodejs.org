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

  if (os === 'LINUX' || os === 'MAC') {
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
      # download and installs Homebrew (macOS/Linux Package Manager)
      curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

      # download and install Node.js
      brew install node@${release.major}

      # verifies the right Node.js version is in the environment
      node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      npm -v # should print \`${release.npm}\``;
  }

  if (os === 'MAC') {
    snippets.DOCKER = dedent`
      # installs Homebrew (macOS/Linux Package Manager)
      curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

      # installs Docker Desktop
      brew install docker --cask

      # pulls the Node.js Docker image
      docker pull node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'}

      # verifies the right Node.js version is in the environment
      docker run node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'} node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      docker run node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'} npm -v # should print \`${release.npm}\``;
  }

  if (os === 'WIN') {
    snippets.CHOCO = dedent`
      # installs Chocolatey (Windows Package Manager)
      Set-ExecutionPolicy Bypass -Scope Process -Force;
      [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
      iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'));

      # download and install Node.js
      choco install nodejs --version="${release.version}"

      # verifies the right Node.js version is in the environment
      node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      npm -v # should print \`${release.npm}\``;

    snippets.DOCKER = dedent`
      # installs Chocolatey (Windows Package Manager)
      Set-ExecutionPolicy Bypass -Scope Process -Force;
      [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
      iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'));

      # installs Docker Desktop
      choco install docker-desktop

      # pulls the Node.js Docker image
      docker pull node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'}

      # verifies the right Node.js version is in the environment
      docker run node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'} node -v # should print \`${release.versionWithPrefix}\`

      # verifies the right NPM version is in the environment
      docker run node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'} npm -v # should print \`${release.npm}\``;
  }

  return snippets;
};
