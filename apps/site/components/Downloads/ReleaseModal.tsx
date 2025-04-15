import Modal from '@node-core/ui-components/Common/Modal';
import type { FC } from 'react';

import LinkWithArrow from '@/components/LinkWithArrow';
import type { NodeRelease } from '@/types';

type ReleaseModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  release: NodeRelease;
};

const ReleaseModal: FC<ReleaseModalProps> = ({
  isOpen,
  closeModal,
  release,
}) => {
  return (
    <Modal
      heading={`Node.js ${release.major} Release`}
      subheading={release?.codename ?? ''}
      open={isOpen}
      onOpenChange={closeModal}
    >
      {release.status !== 'Current' && (
        <LinkWithArrow
          href={`/blog/announcements/v${release.major}-release-announce`}
        >
          Release Announcement
        </LinkWithArrow>
      )}

      <LinkWithArrow
        href={`https://nodejs.org/docs/latest-v${release.major}.x/api/index.html`}
      >
        API Docs
      </LinkWithArrow>

      <h1>Minor</h1>

      <table>
        <thead>
          <tr>
            <th>Version</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {release.minorVersions.map(release => (
            <tr key={release}>
              <td>{release}</td>
              <td>
                <LinkWithArrow href={`/blog/release/v${release}#commits`}>
                  View Release
                </LinkWithArrow>
                <LinkWithArrow
                  href={`https://nodejs.org/docs/v${release}/api/`}
                >
                  API Docs
                </LinkWithArrow>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
};

export default ReleaseModal;
