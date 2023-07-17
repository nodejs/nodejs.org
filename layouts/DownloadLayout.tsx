import BaseLayout from './BaseLayout';
import PrimaryDownloadMatrix from '@/components/Downloads/PrimaryDownloadMatrix';
import SecondaryDownloadMatrix from '@/components/Downloads/SecondaryDownloadMatrix';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { WithNodeRelease } from '@/providers/withNodeRelease';
import type { FC, PropsWithChildren } from 'react';
import type { LegacyDownloadsFrontMatter } from '@/types';

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

          <WithNodeRelease status="Active LTS">
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
