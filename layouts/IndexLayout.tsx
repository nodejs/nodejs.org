import BaseLayout from './BaseLayout';
import Banner from '../components/Home/Banner';
import HomeDownloadButton from '../components/Home/HomeDownloadButton';
import { useDetectOS } from '../hooks/useDetectOS';
import { useNextraContext } from '../hooks/useNextraContext';
import { WithNodeRelease } from '../providers/withNodeRelease';
import type { FC, PropsWithChildren } from 'react';
import type { UserOS } from '../types/userOS';

const getDownloadHeadTextOS = (os: UserOS, bitness: number) => {
  switch (os) {
    case 'MAC':
      return ' macOS';
    case 'WIN':
      return ` Windows (x${bitness})`;
    case 'LINUX':
      return ` Linux (x64)`;
    case 'OTHER':
      return '';
  }
};

const IndexLayout: FC<PropsWithChildren> = ({ children }) => {
  const {
    frontMatter: { labels },
  } = useNextraContext();

  const { os, bitness } = useDetectOS();

  const downloadHeadTextPrefix =
    os === 'OTHER' ? labels['download'] : labels['download-for'];
  const downloadHeadText = `${downloadHeadTextPrefix}${getDownloadHeadTextOS(
    os,
    bitness
  )}`;

  return (
    <BaseLayout>
      <div className="container">
        <div id="home-intro">
          {children}

          <Banner />

          <h2>{downloadHeadText}</h2>

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
