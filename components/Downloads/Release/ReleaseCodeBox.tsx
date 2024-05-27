'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import type { FC } from 'react';

import CodeBox from '@/components/Common/CodeBox';
import { ReleaseContext } from '@/providers/releaseProvider';
import { getShiki, highlightToHtml } from '@/util/getHighlighter';
import { getNodeDownloadSnippet } from '@/util/getNodeDownloadSnippet';

// We cannot do top-level awaits on utilities or code that is imported by client-only components
// hence we only declare a Promise and let it be fulfilled by the first call to the function
const memoizedShiki = getShiki();

const ReleaseCodeBox: FC = () => {
  const { platform, os, release } = useContext(ReleaseContext);

  const [code, setCode] = useState('');
  const t = useTranslations();

  useEffect(() => {
    const updatedCode = getNodeDownloadSnippet(release, os)[platform];
    // Docker and NVM support downloading tags/versions by their full release number
    // but usually we should recommend users to download "major" versions
    // since our Downlooad Buttons get the latest minor of a major, it does make sense
    // to request installation of a major via a package manager
    memoizedShiki
      .then(shiki => highlightToHtml(shiki)(updatedCode, 'bash'))
      .then(setCode);
    // Only react when the specific release number changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [release.versionWithPrefix, os, platform]);

  const codeLanguage = os === 'WIN' ? 'PowerShell' : 'Bash';

  return (
    <div className="mb-2 mt-6 flex flex-col gap-2">
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
