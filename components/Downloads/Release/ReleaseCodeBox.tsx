'use client';

import dedent from 'dedent';
import { useContext, type FC } from 'react';

import CodeBox from '@/components/Common/CodeBox';
import { ReleaseContext } from '@/providers/releaseProvider';

const codeBoxSnippets = (version: string | number) => ({
  NVM: dedent`# Installs NVM (Node Version Manager)
              curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

              # Installs Node.js
              nvm install ${version}

              # Checks that Node is installed
              node -v

              # Checks your NPM version
              npm -v`,
  BREW: `# Installs Brew (Homebrew Package Manager)
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

        # Installs Node.js
        brew install node@${version}

        # Checks that Node is installed
        node -v

        # Checks your NPM version
        npm -v`,
});

const ReleaseCodeBox: FC = () => {
  const {
    platform,
    release: { versionWithPrefix, major },
  } = useContext(ReleaseContext);

  const code = codeBoxSnippets(platform === 'BREW' ? major : versionWithPrefix)[
    platform
  ];

  return (
    <div className="mb-2 mt-6">
      <CodeBox language="Bash">
        <code>{code}</code>
      </CodeBox>
    </div>
  );
};

export default ReleaseCodeBox;
