import dedent from 'dedent';
import type { TranslationValues } from 'next-intl';

import type { NodeRelease } from '@/types';
import type { PackageManager } from '@/types/release';
import type { UserOS } from '@/types/userOS';

export const getNodeDownloadSnippet = (
  release: NodeRelease,
  os: UserOS,
  t: (key: string, values?: TranslationValues) => string
) => {
  const snippets: Record<PackageManager, string> = {
    NVM: '',
    FNM: '',
    BREW: '',
    DOCKER: '',
    CHOCO: '',
  };

  if (os === 'WIN' || os === 'MAC' || os === 'LINUX') {
    snippets.DOCKER = dedent`
      # ${t('layouts.download.codeBox.noteWithColon')}
      # ${t('layouts.download.codeBox.dockerIsNotNodejsPackageManager')}
      # ${t('layouts.download.codeBox.PleaseEndureAlreadyInstallOnSystem')}
      # ${t('layouts.download.codeBox.dockerInstructions')}
      # ${t('layouts.download.codeBox.dockerImagesLink')}

      # ${t('layouts.download.codeBox.pullsNodejsDockerImage')}
      docker pull node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'}

      # ${t('layouts.download.codeBox.verifiesRightNodejsVersion')}
      docker run node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'} node -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.versionWithPrefix })}

      # ${t('layouts.download.codeBox.verifiesRightNpmVersion')}
      docker run node:${release.major}-${release.major >= 4 ? 'alpine' : 'slim'} npm -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.npm })}`;
  }

  if (os === 'MAC' || os === 'LINUX') {
    snippets.NVM = dedent`
      # ${t('layouts.download.codeBox.installsNvm')}
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

      # ${t('layouts.download.codeBox.downloadAndInstallNodejsRestartTerminal')}
      nvm install ${release.major}

      # ${t('layouts.download.codeBox.verifiesRightNodejsVersion')}
      node -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.versionWithPrefix })}

      # ${t('layouts.download.codeBox.verifiesRightNpmVersion')}
      npm -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.npm })}`;

    snippets.FNM = dedent`
      # ${t('layouts.download.codeBox.installsFnm')}
      curl -fsSL https://fnm.vercel.app/install | bash

      # ${t('layouts.download.codeBox.activateFNM')}
      source ~/.bashrc

      # ${t('layouts.download.codeBox.downloadAndInstallNodejs')}
      fnm use --install-if-missing ${release.major}

      # ${t('layouts.download.codeBox.verifiesRightNodejsVersion')}
      node -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.versionWithPrefix })}

      # ${t('layouts.download.codeBox.verifiesRightNpmVersion')}
      npm -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.npm })}`;

    snippets.BREW = dedent`
      # ${t('layouts.download.codeBox.noteWithColon')}
      # ${t('layouts.download.codeBox.homebrewIsNotNodejsPackageManager')}
      # ${t('layouts.download.codeBox.PleaseEndureAlreadyInstallOnSystem')}
      # ${t('layouts.download.codeBox.homebrewInstructions')}
      # ${t('layouts.download.codeBox.homebrewSupportsIntallingMajorNodejsVersion', { version: release.major })}

      # ${t('layouts.download.codeBox.downloadAndInstallNodejs')}
      brew install node@${release.major}

      # ${t('layouts.download.codeBox.verifiesRightNodejsVersion')}
      node -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.versionWithPrefix })}

      # ${t('layouts.download.codeBox.verifiesRightNpmVersion')}
      npm -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.npm })}`;
  }

  if (os === 'WIN') {
    snippets.FNM = dedent`
      # ${t('layouts.download.codeBox.installsFnm')}
      winget install Schniz.fnm

      # ${t('layouts.download.codeBox.fnmEnvSetup')}
      fnm env --use-on-cd | Out-String | Invoke-Expression

      # ${t('layouts.download.codeBox.downloadAndInstallNodejs')}
      fnm use --install-if-missing ${release.major}

      # ${t('layouts.download.codeBox.verifiesRightNodejsVersion')}
      node -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.versionWithPrefix })}

      # ${t('layouts.download.codeBox.verifiesRightNpmVersion')}
      npm -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.npm })}`;

    snippets.CHOCO = dedent`
      # ${t('layouts.download.codeBox.noteWithColon')}
      # ${t('layouts.download.codeBox.chocolateyIsNotNodejsPackageManager')}
      # ${t('layouts.download.codeBox.PleaseEndureAlreadyInstallOnSystem')}
      # ${t('layouts.download.codeBox.chocolateyInstructions')}
      # ${t('layouts.download.codeBox.chocolateyNotMaintanedByNodejs', { version: release.versionWithPrefix })}

      # ${t('layouts.download.codeBox.downloadAndInstallNodejs')}
      choco install nodejs${release.isLts ? '-lts' : ''} --version="${release.version}"

      # ${t('layouts.download.codeBox.verifiesRightNodejsVersion')}
      node -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.major })}

      # ${t('layouts.download.codeBox.verifiesRightNpmVersion')}
      npm -v # ${t('layouts.download.codeBox.shouldPrint', { version: release.npm })}`;
  }

  return snippets;
};
