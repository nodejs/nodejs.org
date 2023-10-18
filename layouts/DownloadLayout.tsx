import type { FC, PropsWithChildren } from 'react';

import PrimaryDownloadMatrix from '@/components/Downloads/PrimaryDownloadMatrix';
import SecondaryDownloadMatrix from '@/components/Downloads/SecondaryDownloadMatrix';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { WithNodeRelease } from '@/providers/withNodeRelease';
import type { LegacyDownloadsFrontMatter } from '@/types';

import BaseLayout from './BaseLayout';

const DownloadLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontMatter } = useLayoutContext();

  const { downloads } = frontMatter as LegacyDownloadsFrontMatter;

  return (
    <BaseLayout>
      <div className="container">
        <article dir="auto">
          <div className="download-header">
            <h1>{downloads.headline}</h1>
          </div>

          {children}

          <WithNodeRelease status={['Active LTS', 'Maintenance LTS']}>
            {({ release }) => (
              <>
                <PrimaryDownloadMatrix {...release} />
                <SecondaryDownloadMatrix {...release} />
              </>
            )}
          </WithNodeRelease>
        </article>
      </div>
    </BaseLayout>
  );
};

export default DownloadLayout;
