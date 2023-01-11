import type { PropsWithChildren } from 'react';
import Banner from '../components/Banner';

import Footer from '../components/Footer';
import Header from '../components/Header';
import HomeDownloadButton from '../components/HomeDownloadButton';
import { useNextraContext } from '../hooks/useNextraContext';
import { useNodeData } from '../hooks/useNodeData';

const IndexLayout = ({ children }: PropsWithChildren) => {
  const { currentLtsVersion, currentNodeVersion } = useNodeData();

  const {
    frontMatter: { labels },
  } = useNextraContext();

  return (
    <>
      <Header />
      <main id="main">
        <div className="container">
          <div id="home-intro">
            {children}

            <Banner />

            <h2 id="home-downloadhead" data-dl-local={labels?.['download-for']}>
              {labels?.['download']}
            </h2>

            <HomeDownloadButton {...currentLtsVersion!} />
            <HomeDownloadButton {...currentNodeVersion!} />

            <p>
              {labels?.['version-schedule-prompt']}{' '}
              <a href="https://github.com/nodejs/release#release-schedule">
                {labels?.['version-schedule-prompt-link-text']}
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default IndexLayout;
