import BaseLayout from './BaseLayout';
import Banner from '../components/Home/Banner';
import HomeDownloadButton from '../components/Home/HomeDownloadButton';
import { useNextraContext } from '../hooks/useNextraContext';
import { useNodeReleasesData } from '../hooks/useNodeReleasesData';
import type { FC, PropsWithChildren } from 'react';

const IndexLayout: FC<PropsWithChildren> = ({ children }) => {
  const { lts, current } = useNodeReleasesData();

  const {
    frontMatter: { labels },
  } = useNextraContext();

  return (
    <BaseLayout>
      <div className="container">
        <div id="home-intro">
          {children}

          <Banner />

          <h2 id="home-downloadhead" data-dl-local={labels['download-for']}>
            {labels['download']}
          </h2>

          <HomeDownloadButton nodeReleaseData={lts} />
          <HomeDownloadButton nodeReleaseData={current} />

          <p>
            {labels['version-schedule-prompt']}{' '}
            <a href="https://github.com/nodejs/release#release-schedule">
              {labels['version-schedule-prompt-link-text']}
            </a>
            .
          </p>
        </div>
      </div>
    </BaseLayout>
  );
};

export default IndexLayout;
