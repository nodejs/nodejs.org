'use client';

import { useTranslations } from 'next-intl';
import type { FC, ReactNode } from 'react';
import { useContext, useEffect, useState } from 'react';
import semVer from 'semver';
import { VFile } from 'vfile';

import Banner from '@/components/Common/Banner';
import JSXCodeBox from '@/components/JSX/CodeBox';
import { ESP_SUPPORT_THRESHOLD_VERSION } from '@/next.constants.mjs';
import { compile } from '@/next.mdx.compiler.mjs';
import { ReleaseContext } from '@/providers/releaseProvider';

const ReleaseCodeBox: FC = () => {
  const { platform, os, release, snippet } = useContext(ReleaseContext);

  const [code, setCode] = useState<ReactNode>(null);
  const t = useTranslations();

  useEffect(() => {
    // Wraps the code snippet (which is a plain string imported from `provideDownloadSnippets`)
    // To be wrapped with the JSX CodeBox component that invokes Shiki's Hast to JSX runtime compiler
    // Whilst evaluating the snippet as a JavaScript template literal, which allows us to access
    // the `props` object passed to the MDX Compiler.
    const wrappedContent = `
      <CodeBox language="${os === 'WIN' ? 'ps1' : 'bash'}">
        {\`${snippet.content}\`}
      </CodeBox>`;

    // Compiles the MDX snippet to JSX and sets the code state
    const promise = compile(
      // Wraps the code snippet with a VFile object to be passed to the MDX Compiler
      new VFile(wrappedContent),
      // The MDX Compiler will use the `jsx` extension to compile the code snippet
      'mdx',
      // Passes the `CodeBox` component to the MDX Compiler as a component within the `components` object
      { CodeBox: JSXCodeBox },
      // Passes the `release` object to the MDX Compiler as a property within the `props` object
      { release }
    );

    // Sets the code state with the compiled JSX code
    promise.then(({ content }) => setCode(content));
    // Only react when the specific release number changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [release.versionWithPrefix, os, platform]);

  return (
    <div className="mb-2 mt-6 flex flex-col gap-2">
      {semVer.lt(release.versionWithPrefix, ESP_SUPPORT_THRESHOLD_VERSION) && (
        <Banner type="error" link="/about/previous-releases/">
          {t('layouts.download.codeBox.unsupportedVersionWarning')}&nbsp;
        </Banner>
      )}

      {code}

      <span className="text-center text-xs text-neutral-800 dark:text-neutral-200">
        {t('layouts.download.codeBox.communityWarning')}
        <br />
        <b>{t('layouts.download.codeBox.communityWarningReport')}</b>
      </span>
    </div>
  );
};

export default ReleaseCodeBox;
