import dedent from 'dedent';

import type { UserOS } from '@/types/userOS';

export const getNodeDownloadSnippet = (major: number, os: UserOS) => {
  if (os === 'LINUX' || os === 'MAC') {
    const platformSnippets = {
      NVM: dedent`
        # Installs NVM (Node Version Manager)
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

        # Installs Node.js
        nvm install v${major}

        # Checks that Node is installed
        node -v

        # Checks your NPM version
        npm -v`,
      BREW: dedent`
        # Installs Brew (macOS/Linux Package Manager)
        curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

        # Installs Node.js
        brew install node@${major}

        # Checks that Node is installed
        node -v

        # Checks your NPM version
        npm -v`,
      DOCKER: '',
    };

    if (os === 'MAC') {
      platformSnippets.DOCKER = dedent`
        # Installs Brew (macOS Package Manager)
        curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

        # Installs Docker Desktop
        brew install docker --cask

        # Pull Node.js Docker Image
        docker pull node:${major}-${major >= 4 ? 'alpine' : 'slim'}
      `;
    }

    return platformSnippets;
  }

  if (os === 'WIN') {
    return {
      NVM: dedent`
        # Installs Chocolatey (Windows Package Manager)
        Set-ExecutionPolicy Bypass -Scope Process -Force;
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'));

        # Installs NVM (Node Version Manager)
        choco install nvm

        # Installs Node.js
        nvm install v${major}

        # Checks that Node is installed
        node -v

        # Checks your NPM version
        npm -v`,
      DOCKER: dedent`
        # Installs Chocolatey (Windows Package Manager)
        Set-ExecutionPolicy Bypass -Scope Process -Force;
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'));

        # Installs Docker Desktop
        choco install docker-desktop

        # Pull Node.js Docker Image
        docker pull node:${major}-${major >= 4 ? 'alpine' : 'slim'}
      `,
      BREW: '',
    };
  }

  return { NVM: '', BREW: '', DOCKER: '' };
};
