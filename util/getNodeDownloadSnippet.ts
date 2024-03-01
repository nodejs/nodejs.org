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
      # Installs NVM (Node Version Manager)
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

      # Installs Node.js
      nvm install ${release.versionWithPrefix}

      # Checks that Node is installed
      node -v

      # Checks your NPM version
      npm -v`;

    snippets.BREW = dedent`
      # Installs Brew (macOS/Linux Package Manager)
      curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

      # Installs Node.js
      brew install node@${release.major}

      # Checks that Node is installed
      node -v

      # Checks your NPM version
      npm -v`;
  }

  if (os === 'MAC') {
    snippets.DOCKER = dedent`
      # Installs Brew (macOS Package Manager)
      curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

      # Installs Docker Desktop
      brew install docker --cask

      # Pull Node.js Docker Image
      docker pull node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'}`;
  }

  if (os === 'WIN') {
    snippets.CHOCO = dedent`
      # Installs Chocolatey (Windows Package Manager)
      Set-ExecutionPolicy Bypass -Scope Process -Force;
      [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
      iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'));

      # Installs Node.js
      choco install nodejs --version="${release.version}"

      # Checks that Node is installed
      node -v

      # Checks your NPM version
      npm -v
    `;

    snippets.DOCKER = dedent`
      # Installs Chocolatey (Windows Package Manager)
      Set-ExecutionPolicy Bypass -Scope Process -Force;
      [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
      iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'));

      # Installs Docker Desktop
      choco install docker-desktop

      # Pull Node.js Docker Image
      docker pull node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'}`;
  }

  return snippets;
};
