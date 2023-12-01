import type { FC, PropsWithChildren } from 'react';

import PrimaryDownloadMatrix from '@/components/Downloads/PrimaryDownloadMatrix';
import SecondaryDownloadMatrix from '@/components/Downloads/SecondaryDownloadMatrix';
import WithNodeRelease from '@/components/withNodeRelease';
import { useClientContext } from '@/hooks/server';

const DownloadLayout: FC<PropsWithChildren> = ({ children }) => {
  const {
    frontmatter: { downloads },
    pathname,
  } = useClientContext();

  const isCurrentReleasePage = pathname.includes('/current');

  return (
    <div className="container">
      <article dir="auto">
        <div className="download-header">
          <h1>{downloads.headline}</h1>
        </div>

        {children}

        {isCurrentReleasePage && (
          <WithNodeRelease status="Current">
            {({ release }) => (
              <>
                <PrimaryDownloadMatrix {...release} />
                <SecondaryDownloadMatrix {...release} />
              </>
            )}
          </WithNodeRelease>
        )}

        {isCurrentReleasePage || (
          <WithNodeRelease status={['Active LTS', 'Maintenance LTS']}>
            {({ release }) => (
              <>
                <PrimaryDownloadMatrix {...release} />
                <SecondaryDownloadMatrix {...release} />
              </>
            )}
          </WithNodeRelease>
        )}
      </article>
    </div>
  );
};

export default DownloadLayout;
