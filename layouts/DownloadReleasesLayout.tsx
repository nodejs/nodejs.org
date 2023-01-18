import Link from 'next/link';
import Script from 'next/script';
import type { PropsWithChildren } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import DownloadReleasesTable from '../components/Downloads/DownloadReleasesTable';
import { useNextraContext } from '../hooks/useNextraContext';
import { useNodeData } from '../hooks/useNodeData';

import type { LegacyDownloadsReleasesFrontMatter } from '../types';

const DownloadReleasesLayout = ({ children }: PropsWithChildren) => {
  const nextraContext = useNextraContext();
  const { availableNodeVersions } = useNodeData();

  const { modules, title } =
    nextraContext.frontMatter as LegacyDownloadsReleasesFrontMatter;

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
                <small id="ref-1">
                  [<Link href="#backref-1">1</Link>]: {modules}
                </small>
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
