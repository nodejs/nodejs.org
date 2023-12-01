import type { FC } from 'react';

import DownloadList from '@/components/Downloads/DownloadList';
import WithNodeRelease from '@/components/withNodeRelease';
import { useClientContext } from '@/hooks/server';
import { DIST_URL } from '@/next.constants.mjs';
import type { NodeRelease } from '@/types';

// @TODO: Legacy Component to be removed in the Website Redesign
const SecondaryDownloadMatrix: FC<NodeRelease> = ({
  versionWithPrefix,
  status,
}) => {
  const {
    frontmatter: { additional },
  } = useClientContext();

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
