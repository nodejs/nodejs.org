'use server';

import dedent from 'dedent';

import type { UserOS } from '@/types/userOS';
import { highlightToHtml } from '@/util/getHighlighter';

const highlightToBash = (code: string) => highlightToHtml(code, 'bash');

export const getNodeDownloadSnippet = async (major: number, os: UserOS) => {
  if (os === 'LINUX' || os === 'MAC') {
    const platformSnippets = {
      NVM: highlightToBash(
        dedent`
        # Installs NVM (Node Version Manager)
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

        # Installs Node.js
        nvm install ${major}

        # Checks that Node is installed
        node -v

        # Checks your NPM version
        npm -v`
      ),
      BREW: highlightToBash(
        dedent`
        # Installs Brew (macOS/Linux Package Manager)
        curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

        # Installs Node.js
        brew install node@${major}

        # Checks that Node is installed
        node -v

        # Checks your NPM version
        npm -v`
      ),
      DOCKER: '',
    };

    if (os === 'MAC') {
      platformSnippets.DOCKER = highlightToBash(dedent`
        # Installs Brew (macOS Package Manager)
        curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

        # Installs Docker Desktop
        brew install docker --cask

        # Pull Node.js Docker Image
        docker pull node:${major}-${major >= 4 ? 'alpine' : 'slim'}
      `);
    }

    return platformSnippets;
  }

  if (os === 'WIN') {
    return {
      NVM: highlightToBash(dedent`
        # Installs Chocolatey (Windows Package Manager)
        Set-ExecutionPolicy Bypass -Scope Process -Force;
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'));

        # Installs NVM (Node Version Manager)
        choco install nvm

        # Installs Node.js
        nvm install ${major}

        # Checks that Node is installed
        node -v

        # Checks your NPM version
        npm -v`),
      DOCKER: highlightToBash(dedent`
        # Installs Chocolatey (Windows Package Manager)
        Set-ExecutionPolicy Bypass -Scope Process -Force;
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'));

        # Installs Docker Desktop
        choco install docker-desktop

        # Pull Node.js Docker Image
        docker pull node:${major}-${major >= 4 ? 'alpine' : 'slim'}
      `),
      BREW: '',
    };
  }

  return { NVM: '', BREW: '', DOCKER: '' };
};
