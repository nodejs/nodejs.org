'use client';

import classNames from 'classnames';
import type { FC } from 'react';
import semVer from 'semver';

import Link from '@/components/Link';
import WithCurrentOS from '@/components/withCurrentOS';
import { useClientContext } from '@/hooks';
import { DIST_URL } from '@/next.constants.mjs';
import type { NodeRelease } from '@/types';

// @TODO: Legacy Component to be removed in the Website Redesign
const PrimaryDownloadMatrix: FC<NodeRelease> = ({
  version,
  versionWithPrefix,
  isLts,
  npm,
}) => {
  const {
    frontmatter: { downloads },
  } = useClientContext();

  const hasWindowsArm64 = semVer.satisfies(version, '>= 19.9.0');

  const getIsVersionClassName = (isCurrent: boolean) =>
    classNames({ 'is-version': isCurrent });

  return (
    <section>
      <p className="color-lightgray">
        {downloads.currentVersion}: <strong>{version}</strong> (
        {downloads.includes || 'includes'} npm {npm})
      </p>
      <p>{downloads.intro}</p>

      <div className="download-hero full-width">
        <ul className="no-padding download-version-toggle">
          <li>
            <Link
              className={getIsVersionClassName(isLts)}
              href="/download/"
              title={`${downloads['display-hint']} ${downloads.lts}`}
            >
              <div className="title">{downloads.lts}</div>
              <div className="tag">{downloads['tagline-lts']}</div>
            </Link>
          </li>
          <li>
            <Link
              className={getIsVersionClassName(!isLts)}
              href="/download/current"
              title={`${downloads['display-hint']} ${downloads.current}`}
            >
              <div className="title">{downloads.current}</div>
              <div className="tag">{downloads['tagline-current']}</div>
            </Link>
          </li>
        </ul>
        <ul className="no-padding download-platform">
          <li>
            <WithCurrentOS>
              {({ currentOS }) => (
                <a
                  href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-x${currentOS.bitness}.msi`}
                  data-version={versionWithPrefix}
                >
                  <svg
                    className="download-logo"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    focusable="false"
                  >
                    <path d="M1.589 23.55L1.572 8.24l18.839-2.558V23.55zM23.55 5.225l25.112-3.654V23.55H23.55zM48.669 26.69l-.006 21.979-25.112-3.533V26.69zM20.41 44.736l-18.824-2.58-.001-15.466H20.41z" />
                  </svg>
                  {downloads.WindowsInstaller}
                  <p className="small color-lightgray">
                    node-{versionWithPrefix}-x{currentOS.bitness}.msi
                  </p>
                </a>
              )}
            </WithCurrentOS>
          </li>
          <li>
            <a
              href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}.pkg`}
            >
              <svg
                className="download-logo"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                focusable="false"
              >
                <path d="M39.054 34.065q-1.093 3.504-3.448 7.009-3.617 5.495-7.205 5.495-1.374 0-3.925-.897-2.411-.897-4.233-.897-1.71 0-3.981.925-2.271.953-3.701.953-4.261 0-8.439-7.261Q.001 32.075.001 25.29q0-6.392 3.168-10.485 3.14-4.037 7.962-4.037 2.019 0 4.962.841 2.916.841 3.869.841 1.262 0 4.009-.953 2.86-.953 4.85-.953 3.336 0 5.972 1.822 1.458 1.009 2.916 2.804-2.215 1.878-3.196 3.308-1.822 2.635-1.822 5.803 0 3.476 1.934 6.252t4.43 3.533zM28.512 1.179q0 1.71-.813 3.813-.841 2.103-2.607 3.869-1.514 1.514-3.028 2.019-1.037.308-2.916.477.084-4.177 2.187-7.205 2.075-3 7.009-4.149.028.084.07.308t.07.308q0 .112.014.28t.014.28z" />
              </svg>
              {downloads.MacOSInstaller}
              <p className="small color-lightgray">
                node-{versionWithPrefix}.pkg
              </p>
            </a>
          </li>
          <li>
            <a
              href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}.tar.gz`}
            >
              <svg
                className="download-logo"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                focusable="false"
              >
                <path d="M25.03.934L.159 11.65l24.895 10.632 25.152-10.656L25.03.935zm1.02 22.686v25.686l24.188-11.483V13.345L26.05 23.62zM.001 37.824l24.27 11.483V23.621L.001 13.346v24.478z" />
              </svg>
              {downloads.SourceCode}
              <p className="small color-lightgray">
                node-{versionWithPrefix}.tar.gz
              </p>
            </a>
          </li>
        </ul>
      </div>

      <table className="download-matrix full-width">
        <tbody>
          <tr>
            <th>{downloads.WindowsInstaller} (.msi)</th>
            <td colSpan={hasWindowsArm64 ? 1 : 2}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-x86.msi`}
              >
                32-bit
              </a>
            </td>
            <td colSpan={2}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-x64.msi`}
              >
                64-bit
              </a>
            </td>
            {hasWindowsArm64 && (
              <td colSpan={1}>
                <a
                  href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-arm64.msi`}
                >
                  ARM64
                </a>
              </td>
            )}
          </tr>

          <tr>
            <th>{downloads.WindowsBinary} (.zip)</th>
            <td colSpan={hasWindowsArm64 ? 1 : 2}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-win-x86.zip`}
              >
                32-bit
              </a>
            </td>
            <td colSpan={2}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-win-x64.zip`}
              >
                64-bit
              </a>
            </td>
            {hasWindowsArm64 && (
              <td colSpan={1}>
                <a
                  href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-win-arm64.zip`}
                >
                  ARM64
                </a>
              </td>
            )}
          </tr>

          <tr>
            <th>{downloads.MacOSInstaller} (.pkg)</th>
            <td colSpan={4}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}.pkg`}
              >
                64-bit / ARM64
              </a>
            </td>
          </tr>
          <tr>
            <th>{downloads.MacOSBinary} (.tar.gz)</th>
            <td colSpan={2}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-darwin-x64.tar.gz`}
              >
                64-bit
              </a>
            </td>
            <td colSpan={2}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-darwin-arm64.tar.gz`}
              >
                ARM64
              </a>
            </td>
          </tr>

          <tr>
            <th>{downloads.LinuxBinaries} (x64)</th>
            <td colSpan={4}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-linux-x64.tar.xz`}
              >
                64-bit
              </a>
            </td>
          </tr>
          <tr>
            <th>{downloads.LinuxBinaries} (ARM)</th>
            <td colSpan={2}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-linux-armv7l.tar.xz`}
              >
                ARMv7
              </a>
            </td>
            <td colSpan={2}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}-linux-arm64.tar.xz`}
              >
                ARMv8
              </a>
            </td>
          </tr>

          <tr>
            <th>{downloads.SourceCode}</th>
            <td colSpan={4}>
              <a
                href={`${DIST_URL}${versionWithPrefix}/node-${versionWithPrefix}.tar.gz`}
              >
                node-{versionWithPrefix}.tar.gz
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default PrimaryDownloadMatrix;
