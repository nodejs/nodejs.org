import dedent from 'dedent';

import type { UserOS } from '@/types/userOS';
import { getShiki, highlightToHtml } from '@/util/getHighlighter';

// We cannot do top-level awaits on utilities or code that is imported by client-only components
// hence we only declare a Promise and let it be fulfilled by the first call to the function
const memoizedShiki = getShiki();

const highlightToBash = async (code: string) =>
  memoizedShiki.then(shiki => highlightToHtml(shiki)(code, 'bash'));

export const getNodeDownloadSnippet = async (major: number, os: UserOS) => {
  if (os === 'LINUX' || os === 'MAC') {
    const platformSnippets = {
      NVM: await highlightToBash(
        dedent`
        # Installs NVM (Node Version Manager)
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

        # Installs Node.js
        nvm install v${major}

        # Checks that Node is installed
        node -v

        # Checks your NPM version
        npm -v`
      ),
      BREW: await highlightToBash(
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
      platformSnippets.DOCKER = await highlightToBash(dedent`
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
      NVM: await highlightToBash(dedent`
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
        npm -v`),
      DOCKER: await highlightToBash(dedent`
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
