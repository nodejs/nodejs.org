import DownloadList from './DownloadList';
import { useNextraContext } from '../../hooks/useNextraContext';
import { WithNodeRelease } from '../../providers/withNodeRelease';
import type { LegacyDownloadsFrontMatter, NodeRelease } from '../../types';
import type { FC } from 'react';

// @TODO: Instead of using a static list it should be created dynamically. This is done on `nodejs.dev`
// since this is a temporary solution and going to be fixed in the future.
const SecondaryDownloadMatrix: FC<NodeRelease> = ({
  versionWithPrefix,
  status,
}) => {
  const nextraContext = useNextraContext();

  const { additional } =
    nextraContext.frontMatter as LegacyDownloadsFrontMatter;

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
                href={`https://nodejs.org/dist/${versionWithPrefix}/node-${versionWithPrefix}-linux-ppc64le.tar.xz`}
              >
                64-bit
              </a>
            </td>
          </tr>

          <tr>
            <th>{additional.LinuxSystemZ}</th>
            <td>
              <a
                href={`https://nodejs.org/dist/${versionWithPrefix}/node-${versionWithPrefix}-linux-s390x.tar.xz`}
              >
                64-bit
              </a>
            </td>
          </tr>
          <tr>
            <th>{additional.AIXPowerSystems}</th>
            <td>
              <a
                href={`https://nodejs.org/dist/${versionWithPrefix}/node-${versionWithPrefix}-aix-ppc64.tar.gz`}
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
