'use client';

import { useState, useEffect } from 'react';
import type { FC, ReactElement } from 'react';
import { VFile } from 'vfile';

import ChangelogModal from '@/components/Downloads/ChangelogModal';
import changelogData from '@/next-data/changelogData';
import { compile } from '@/next.mdx.compiler.mjs';
import { clientMdxComponents, htmlComponents } from '@/next.mdx.use.client.mjs';
import type { NodeRelease } from '@/types';
import {
  getNodeJsChangelogAuthor,
  getNodeJsChangelogSlug,
} from '@/util/getNodeJsChangelog';
import { getGitHubAvatarUrl } from '@/util/gitHubUtils';

type WithChangelogModalProps = {
  release: NodeRelease;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

// We only need the base components for our ChangelogModal, this avoids/eliminates
// the need of Next.js bundling on the client-side all our MDX components
// Note that this already might increase the client-side bundle due to Shiki
const clientComponents = { ...clientMdxComponents, ...htmlComponents };

const WithChangelogModal: FC<WithChangelogModalProps> = ({
  release: { versionWithPrefix },
  modalOpen,
  setModalOpen,
}) => {
  const [ChangelogMDX, setChangelogMDX] = useState<ReactElement>();
  const [changelog, setChangelog] = useState<string>('');

  useEffect(() => {
    let isCancelled = false;

    const fetchChangelog = async () => {
      try {
        const data = await changelogData(versionWithPrefix);

        // We need to check if the component is still mounted before setting the state
        if (!isCancelled) {
          setChangelog(data);

          // This removes the <h2> header from the changelog content, as we already
          // render the changelog heading as the "ChangelogModal" subheading
          const changelogWithoutHeader = data.split('\n').slice(2).join('\n');

          const source = new VFile(changelogWithoutHeader);

          compile(source, 'md', clientComponents).then(({ content }) =>
            setChangelogMDX(content)
          );
        }
      } catch {
        throw new Error(`Failed to fetch changelog for, ${versionWithPrefix}`);
      }
    };

    if (modalOpen && versionWithPrefix) {
      fetchChangelog();
    }

    return () => {
      isCancelled = true;
    };
  }, [modalOpen, versionWithPrefix]);

  const author = getNodeJsChangelogAuthor(changelog);
  const slug = getNodeJsChangelogSlug(changelog);

  const modalProps = {
    heading: `Node.js ${versionWithPrefix}`,
    avatars: [{ src: getGitHubAvatarUrl(author), alt: author }],
    subheading: slug,
    open: modalOpen && typeof ChangelogMDX !== 'undefined',
    onOpenChange: setModalOpen,
  };

  return (
    <ChangelogModal {...modalProps}>
      <main>{ChangelogMDX}</main>
    </ChangelogModal>
  );
};

export default WithChangelogModal;
