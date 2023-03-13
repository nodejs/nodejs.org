import type { PropsWithChildren } from 'react';
import Link from 'next/link';

import BaseLayout from './BaseLayout';
import Banner from '../components/Home/Banner';
import HomeDownloadButton from '../components/Home/HomeDownloadButton';
import { useNextraContext } from '../hooks/useNextraContext';
import { useNodeData } from '../hooks/useNodeData';

const IndexLayout = ({ children }: PropsWithChildren) => {
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
            {labels['download-for']}
          </h2>

          <HomeDownloadButton {...currentLtsVersion!} />
          <HomeDownloadButton {...currentNodeVersion!} />

          <p>
            {labels['version-schedule-prompt']}{' '}
            <Link href="https://github.com/nodejs/release#release-schedule">
              {labels['version-schedule-prompt-link-text']}
            </Link>
            .
          </p>
        </div>
      </div>
    </BaseLayout>
  );
};

export default IndexLayout;
