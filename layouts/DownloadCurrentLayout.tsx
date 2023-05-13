import BaseLayout from './BaseLayout';
import PrimaryDownloadMatrix from '../components/Downloads/PrimaryDownloadMatrix';
import SecondaryDownloadMatrix from '../components/Downloads/SecondaryDownloadMatrix';
import { useNextraContext } from '../hooks/useNextraContext';
import { useNodeReleasesData } from '../hooks/useNodeReleasesData';
import type { FC, PropsWithChildren } from 'react';
import type { LegacyDownloadsFrontMatter } from '../types';

const DownloadCurrentLayout: FC<PropsWithChildren> = ({ children }) => {
  const nextraContext = useNextraContext();
  const { current } = useNodeReleasesData();

  const { downloads } = nextraContext.frontMatter as LegacyDownloadsFrontMatter;

  return (
    <BaseLayout>
      <div className="container">
        <article dir="auto">
          <div className="download-header">
            <h1>{downloads.headline}</h1>
          </div>

          {children}

          <PrimaryDownloadMatrix nodeReleaseData={current} />
          <SecondaryDownloadMatrix nodeReleaseData={current} />
        </article>
      </div>
    </BaseLayout>
  );
};

export default DownloadCurrentLayout;
