import BaseLayout from './BaseLayout';
import LocalizedLink from '../components/LocalizedLink';
import ImageEvents from '../components/Home/events/images';
import Banner from '../components/Home/Banner';
import HomeDownloadButton from '../components/Home/HomeDownloadButton';
import { useNextraContext } from '../hooks/useNextraContext';
import { useNodeData } from '../hooks/useNodeData';
import type { FC, PropsWithChildren } from 'react';

const IndexLayout: FC<PropsWithChildren> = ({ children }) => {
  const { currentLtsVersion, currentNodeVersion } = useNodeData();

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

          <HomeDownloadButton {...currentLtsVersion!} />
          <HomeDownloadButton {...currentNodeVersion!} />

          <p>
            {labels['version-schedule-prompt']}{' '}
            <a href="https://github.com/nodejs/release#release-schedule">
              {labels['version-schedule-prompt-link-text']}
            </a>
            .
          </p>
          <div className="events">
            <ImageEvents />
            <div>
              <h3>{labels['events-title']}</h3>
              <LocalizedLink href="/get-involved/collab-summit">
                {labels['events-subtitle']}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default IndexLayout;
