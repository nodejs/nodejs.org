import { useMemo } from 'react';
import useSWR from 'swr';
import { sanitize } from 'isomorphic-dompurify';
import semVer from 'semver';
import BaseLayout from './BaseLayout';
import { useNextraContext } from '../hooks/useNextraContext';
import DownloadReleasesTable from '../components/Downloads/DownloadReleasesTable';
import type { FC, PropsWithChildren } from 'react';
import type { LegacyDownloadsReleasesFrontMatter } from '../types';

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then(res => res.json());

const DownloadReleasesLayout: FC<PropsWithChildren> = ({ children }) => {
  const nextraContext = useNextraContext();

  const { data = [] } = useSWR<any[]>(
    'https://nodejs.org/dist/index.json',
    fetcher
  );

  const availableNodeVersions = useMemo(() => {
    const majorVersions = new Map();

    data.reverse().forEach(v =>
      majorVersions.set(semVer.major(v.version), {
        node: v.version,
        nodeNumeric: v.version.replace(/^v/, ''),
        nodeMajor: `v${semVer.major(v.version)}.x`,
        npm: v.npm || 'N/A',
        v8: v.v8 || 'N/A',
        openssl: v.openssl || 'N/A',
        isLts: Boolean(v.lts),
        releaseDate: v.date,
        ltsName: v.lts || null,
        modules: v.modules || '0',
      })
    );

    return [...majorVersions.values()].reverse();
  }, [data]);

  const { modules, title } =
    nextraContext.frontMatter as LegacyDownloadsReleasesFrontMatter;

  // @TODO: Remove this once we migrate to `nodejs/nodejs.dev` codebase as this is unsafe
  // And completely not recommended
  const extraModulesContent = useMemo(
    () => sanitize(`[<a href="#backref-1">1</a>]: ${modules}`),
    [modules]
  );

  return (
    <BaseLayout>
      <div className="container">
        <article dir="auto">
          <h1>{title}</h1>

          <section>{children}</section>

          <section>
            <DownloadReleasesTable releases={availableNodeVersions} />
            <p>
              <small
                id="ref-1"
                dangerouslySetInnerHTML={{ __html: extraModulesContent }}
              />
            </p>
          </section>
        </article>
      </div>
    </BaseLayout>
  );
};

export default DownloadReleasesLayout;
