import type { PropsWithChildren } from 'react';
import PrimaryDownloadMatrix from '../components/Downloads/PrimaryDownloadMatrix';
import SecondaryDownloadMatrix from '../components/Downloads/SecondaryDownloadMatrix';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNextraContext } from '../hooks/useNextraContext';
import { useNodeData } from '../hooks/useNodeData';

import type { LegacyDownloadsFrontMatter } from '../types';

const DownloadCurrentLayout = ({ children }: PropsWithChildren) => {
  const nextraContext = useNextraContext();
  const { currentNodeVersion } = useNodeData();

  const { downloads } = nextraContext.frontMatter as LegacyDownloadsFrontMatter;

  return (
    <>
      <Header />
      <main id="main">
        <div className="container">
          <article dir="auto">
            <div className="download-header">
              <h1>{downloads.headline}</h1>
            </div>

            {children}

            <PrimaryDownloadMatrix {...currentNodeVersion} />
            <SecondaryDownloadMatrix {...currentNodeVersion} />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DownloadCurrentLayout;
