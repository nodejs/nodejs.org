import { useMemo } from 'react';
import type { FC, PropsWithChildren } from 'react';

import DownloadReleasesTable from '@/components/Downloads/DownloadReleasesTable';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import type { LegacyDownloadsReleasesFrontMatter } from '@/types';

import BaseLayout from './BaseLayout';

const DownloadReleasesLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontMatter } = useLayoutContext();

  const { modules, title } = frontMatter as LegacyDownloadsReleasesFrontMatter;

  // @TODO: Remove this once we migrate to `nodejs/nodejs.dev` codebase as this is unsafe
  // And completely not recommended
  const extraModulesContent = useMemo(
    () => `[<a href="#backref-1">1</a>]: ${modules}`,
    [modules]
  );

  return (
    <BaseLayout>
      <div className="container">
        <article dir="auto">
          <h1>{title}</h1>

          <section>{children}</section>

          <section>
            <DownloadReleasesTable />
            <p>
              <small
                id="ref-1"
                dangerouslySetInnerHTML={{ __html: extraModulesContent }}
              />
            </p>
          </section>
        </article>
      </div>
    </BaseLayout>
  );
};

export default DownloadReleasesLayout;
