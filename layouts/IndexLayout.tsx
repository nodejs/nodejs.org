import BaseLayout from './BaseLayout';
import Banner from '../components/Home/Banner';
import HomeDownloadButton from '../components/Home/HomeDownloadButton';
import { useNextraContext } from '../hooks/useNextraContext';
import { WithNodeRelease } from '../providers/WithNodeRelease';
import type { FC, PropsWithChildren } from 'react';

const IndexLayout: FC<PropsWithChildren> = ({ children }) => {
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

          <WithNodeRelease status="Active LTS">
            {({ release }) => <HomeDownloadButton {...release} />}
          </WithNodeRelease>

          <WithNodeRelease status="Current">
            {({ release }) => <HomeDownloadButton {...release} />}
          </WithNodeRelease>

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
