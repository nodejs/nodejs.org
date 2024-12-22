'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useContext, useMemo } from 'react';
import semVer from 'semver';

import Banner from '@/components/Common/Banner';
import Skeleton from '@/components/Common/Skeleton';
import JSXCodeBox from '@/components/JSX/CodeBox';
import { ESP_SUPPORT_THRESHOLD_VERSION } from '@/next.constants.mjs';
import { createSval } from '@/next.jsx.compiler.mjs';
import { ReleaseContext } from '@/providers/releaseProvider';

const ReleaseCodeBox: FC = () => {
  const { platform, os, release, snippet } = useContext(ReleaseContext);

  const t = useTranslations();

  const parsedSnippet = useMemo(() => {
    // Creates a minimal JavaScript interpreter for parsing the JavaScript code from the snippets
    const interpreter = createSval({ props: { release } }, 'script');

    // Evaluates the JavaScript code applying the release context to the code
    interpreter.run(`exports.content = \`${snippet.content}\``);

    // Sets the parsed raw string to be used by the JSX CodeBox
    return interpreter.exports.content;
    // Only react when the specific release number changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [release.versionWithPrefix, os, platform]);

  const codeLanguage = os === 'WIN' ? 'ps1' : 'bash';

  return (
    <div className="mb-2 mt-6 flex flex-col gap-2">
      {semVer.lt(release.versionWithPrefix, ESP_SUPPORT_THRESHOLD_VERSION) && (
        <Banner type="error" link="/about/previous-releases/">
          {t('layouts.download.codeBox.unsupportedVersionWarning')}&nbsp;
        </Banner>
      )}

      <Skeleton loading={os === 'LOADING'}>
        <JSXCodeBox language={codeLanguage} className="min-h-[12rem]">
          {parsedSnippet}
        </JSXCodeBox>
      </Skeleton>

      <span className="text-center text-xs text-neutral-800 dark:text-neutral-200">
        {t('layouts.download.codeBox.communityWarning')}
        <br />
        <b>{t('layouts.download.codeBox.communityWarningReport')}</b>
      </span>
    </div>
  );
};

export default ReleaseCodeBox;
