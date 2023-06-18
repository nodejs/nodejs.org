import { useMemo } from 'react';
import { sanitize } from 'isomorphic-dompurify';
import BaseLayout from './BaseLayout';
import { useNextraContext } from '../hooks/useNextraContext';
import DownloadReleasesTable from '../components/Downloads/DownloadReleasesTable';
import type { FC, PropsWithChildren } from 'react';
import type { LegacyDownloadsReleasesFrontMatter } from '../types';

const DownloadReleasesLayout: FC<PropsWithChildren> = ({ children }) => {
  const nextraContext = useNextraContext();

  const { modules, title } =
    nextraContext.frontMatter as LegacyDownloadsReleasesFrontMatter;

  // @TODO: Remove this once we migrate to `nodejs/nodejs.dev` codebase as this is unsafe
  // And completely not recommended
  const extraModulesContent = useMemo(
    () => sanitize(`[<a href="#backref-1">1</a>]: ${modules}`),
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
