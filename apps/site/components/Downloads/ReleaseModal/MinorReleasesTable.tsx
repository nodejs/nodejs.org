import type { FC } from 'react';

import LinkWithArrow from '@/components/LinkWithArrow';

type MinorReleasesTableProps = {
  releases: Array<string>;
};

export const MinorReleasesTable: FC<MinorReleasesTableProps> = ({
  releases,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Version</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {releases.map(release => (
          <tr key={release}>
            <td>{release}</td>
            <td>
              <LinkWithArrow href={`/blog/release/v${release}#commits`}>
                View Release
              </LinkWithArrow>
              <LinkWithArrow href={`https://nodejs.org/docs/v${release}/api/`}>
                API Docs
              </LinkWithArrow>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
