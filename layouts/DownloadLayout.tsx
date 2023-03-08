import type { PropsWithChildren } from 'react';

import BaseLayout from './BaseLayout';
import PrimaryDownloadMatrix from '../components/Downloads/PrimaryDownloadMatrix';
import SecondaryDownloadMatrix from '../components/Downloads/SecondaryDownloadMatrix';
import { useNextraContext } from '../hooks/useNextraContext';
import { useNodeData } from '../hooks/useNodeData';

import type { LegacyDownloadsFrontMatter, NodeVersionData } from '../types';

const DownloadLayout = ({ children }: PropsWithChildren) => {
  const nextraContext = useNextraContext();
  const { currentLtsVersion = {} as NodeVersionData } = useNodeData();

  const { downloads } = nextraContext.frontMatter as LegacyDownloadsFrontMatter;

  return (
    <BaseLayout>
      <div className="container">
        <article dir="auto">
          <div className="download-header">
            <h1>{downloads.headline}</h1>
          </div>

          {children}

          <PrimaryDownloadMatrix {...currentLtsVersion} />
          <SecondaryDownloadMatrix {...currentLtsVersion} />
        </article>
      </div>
    </BaseLayout>
  );
};

export default DownloadLayout;
