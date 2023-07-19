import DownloadList from './DownloadList';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { WithNodeRelease } from '@/providers/withNodeRelease';
import { DIST_URL } from '@/next.constants.mjs';
import type { LegacyDownloadsFrontMatter, NodeRelease } from '@/types';
import type { FC } from 'react';

// @TODO: Instead of using a static list it should be created dynamically. This is done on `nodejs.dev`
// since this is a temporary solution and going to be fixed in the future.
const SecondaryDownloadMatrix: FC<NodeRelease> = ({
  versionWithPrefix,
  status,
}) => {
  const { frontMatter } = useLayoutContext();

  const { additional } = frontMatter as LegacyDownloadsFrontMatter;

  return (
    <section>
      <h2>{additional.headline}</h2>
      <table className="download-matrix full-width">
        <tbody>
          <tr>
            <th>{additional.DockerImage}</th>
            <td>
              <a href="https://hub.docker.com/_/node/">
                {additional.officialDockerImage}
              </a>
            </td>
          </tr>

          <tr>
            <th>{additional.LinuxPowerSystems}</th>
            <td>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-linux-ppc64le.tar.xz`}
              >
                64-bit
              </a>
            </td>
          </tr>

          <tr>
            <th>{additional.LinuxSystemZ}</th>
            <td>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-linux-s390x.tar.xz`}
              >
                64-bit
              </a>
            </td>
          </tr>
          <tr>
            <th>{additional.AIXPowerSystems}</th>
            <td>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-aix-ppc64.tar.gz`}
              >
                64-bit
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <WithNodeRelease status={status}>
        {({ release }) => <DownloadList {...release} />}
      </WithNodeRelease>
    </section>
  );
};

export default SecondaryDownloadMatrix;
