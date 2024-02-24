'use client';

import { useContext, useEffect, useState } from 'react';
import type { FC } from 'react';

import CodeBox from '@/components/Common/CodeBox';
import { ReleaseContext } from '@/providers/releaseProvider';
import { getNodeDownloadSnippet } from '@/util/getNodeDownloadSnippet';

const ReleaseCodeBox: FC = () => {
  const {
    platform,
    os,
    release: { major },
  } = useContext(ReleaseContext);

  const [code, setCode] = useState('');

  useEffect(() => {
    // Docker and NVM support downloading tags/versions by their full release number
    // but usually we should recommend users to download "major" versions
    // since our Downlooad Buttons get the latest minor of a major, it does make sense
    // to request installation of a major via a package manager
    getNodeDownloadSnippet(major, os).then(platforms =>
      setCode(platforms[platform])
    );
  }, [major, os, platform]);

  return (
    <div className="mb-2 mt-6 flex min-h-80 flex-col gap-2">
      <CodeBox language="Bash">
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </CodeBox>

      <span className="text-center text-xs text-neutral-800 dark:text-neutral-200">
        Package Managers and their installation scripts are not maintained by
        the Node.js project.
      </span>
    </div>
  );
};

export default ReleaseCodeBox;
