'use client';

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
  const {
    platform,
    os,
    release: { major },
  } = useContext(ReleaseContext);

  const [code, setCode] = useState('');

  useEffect(() => {
    const updatedCode = getNodeDownloadSnippet(major, os)[platform];
    // Docker and NVM support downloading tags/versions by their full release number
    // but usually we should recommend users to download "major" versions
    // since our Downlooad Buttons get the latest minor of a major, it does make sense
    // to request installation of a major via a package manager
    memoizedShiki
      .then(shiki => highlightToHtml(shiki)(updatedCode, 'bash'))
      .then(setCode);
  }, [major, os, platform]);

  return (
    <div className="mb-2 mt-6 flex min-h-80 flex-col gap-2">
      {code && (
        <CodeBox language="Bash">
          <code dangerouslySetInnerHTML={{ __html: code }} />
        </CodeBox>
      )}

      <span className="text-center text-xs text-neutral-800 dark:text-neutral-200">
        Package Managers and their installation scripts are not maintained by
        the Node.js project.
      </span>
    </div>
  );
};

export default ReleaseCodeBox;
