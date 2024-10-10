'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import type { FC } from 'react';

import CodeBox from '@/components/Common/CodeBox';
import { ReleaseContext } from '@/providers/releaseProvider';
import { shikiPromise, highlightToHtml } from '@/util/getHighlighter';
import { getNodeDownloadSnippet } from '@/util/getNodeDownloadSnippet';

const memoizedShiki = shikiPromise.then(highlightToHtml);

const ReleaseCodeBox: FC = () => {
  const { platform, os, release } = useContext(ReleaseContext);
  const locale = useLocale();

  const [code, setCode] = useState('');
  const t = useTranslations();

  useEffect(() => {
    const updatedCode = getNodeDownloadSnippet(release, os, t)[platform];
    // Docker and NVM support downloading tags/versions by their full release number
    // but usually we should recommend users to download "major" versions
    // since our Download Buttons get the latest minor of a major, it does make sense
    // to request installation of a major via a package manager
    memoizedShiki.then(shiki => shiki(updatedCode, 'bash')).then(setCode);
    // Only react when the specific release number changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [release.versionWithPrefix, os, platform]);

  const parseVersion = () => {
    const version = release.versionWithPrefix.replace('v', '');
    const versionParts = version.split('.');
    return {
      major: parseInt(versionParts[0]),
      minor: parseInt(versionParts[1]),
      patch: parseInt(versionParts[2]),
    };
  };

  const codeLanguage = os === 'WIN' ? 'PowerShell' : 'Bash';

  return (
    <div className="mb-2 mt-6 flex flex-col gap-2">
      {parseVersion().major < 18 && (
        <div
          className="border-danger-400 bg-danger-100 relative rounded border px-4 py-3 text-red-700"
          role="alert"
        >
          {t('layouts.download.codeBox.unsupportedVersionWarning')}&nbsp;
          <a href={`/${locale}/about/previous-releases/`}>Previous Releases</a>
        </div>
      )}
      <CodeBox language={codeLanguage} className="min-h-[15.5rem]">
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </CodeBox>
      <span className="text-center text-xs text-neutral-800 dark:text-neutral-200">
        {t('layouts.download.codeBox.communityWarning')}
        <br />
        <b>{t('layouts.download.codeBox.communityWarningReport')}</b>
      </span>
    </div>
  );
};

export default ReleaseCodeBox;
