import { useMemo } from 'react';
import Script from 'next/script';
import { sanitize } from 'isomorphic-dompurify';
import type { PropsWithChildren } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import DownloadReleasesTable from '../components/Downloads/DownloadReleasesTable';
import { useNextraContext } from '../hooks/useNextraContext';
import { useNodeData } from '../hooks/useNodeData';

import type { LegacyDownloadsReleasesFrontMatter } from '../types';

// @TODO: Remove the `Script` once we migrate to `nodejs/nodejs.dev` codebase as this is unsafe
const DownloadReleasesLayout = ({ children }: PropsWithChildren) => {
  const nextraContext = useNextraContext();
  const { availableNodeVersions } = useNodeData();

  const { modules, title } =
    nextraContext.frontMatter as LegacyDownloadsReleasesFrontMatter;

  // @TODO: Remove this once we migrate to `nodejs/nodejs.dev` codebase as this is unsafe
  // And completely not recommended
  const extraModulesContent = useMemo(
    () => sanitize(`[<a href="#backref-1">1</a>]: ${modules}`),
    [modules]
  );

  return (
    <>
      <Header />
      <main id="main">
        <div className="container">
          <article dir="auto">
            <h1>{title}</h1>

            <section>{children}</section>

            <section>
              <DownloadReleasesTable releases={availableNodeVersions} />
              <p>
                <small
                  id="ref-1"
                  dangerouslySetInnerHTML={{ __html: extraModulesContent }}
                />
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
      <Script strategy="lazyOnload" src="/static/js/previousVersion.js" />
    </>
  );
};

export default DownloadReleasesLayout;
