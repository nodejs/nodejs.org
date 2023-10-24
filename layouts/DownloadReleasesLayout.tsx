import { useMemo } from 'react';
import type { FC, PropsWithChildren } from 'react';

import DownloadReleasesTable from '@/components/Downloads/DownloadReleasesTable';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import type { LegacyDownloadsReleasesFrontMatter } from '@/types';

import AboutLayout from './AboutLayout';

const DownloadReleasesLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontMatter } = useLayoutContext();

  const { modules } = frontMatter as LegacyDownloadsReleasesFrontMatter;

  // @TODO: Remove this once we migrate to `nodejs/nodejs.dev` codebase as this is unsafe
  // And completely not recommended
  const extraModulesContent = useMemo(
    () => `[<a href="#backref-1">1</a>]: ${modules}`,
    [modules]
  );

  return (
    <AboutLayout>
      {children}

      <section>
        <DownloadReleasesTable />
        <p>
          <small
            id="ref-1"
            dangerouslySetInnerHTML={{ __html: extraModulesContent }}
          />
        </p>
      </section>
    </AboutLayout>
  );
};

export default DownloadReleasesLayout;
