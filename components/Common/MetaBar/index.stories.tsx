import { CodeBracketIcon } from '@heroicons/react/24/outline';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

import AvatarGroup from '@/components/Common/AvatarGroup';
import LocalizedLink from '@/components/LocalizedLink';

import MetaBar from './index';

type Story = StoryObj<typeof MetaBar>;
type Meta = MetaObj<typeof MetaBar>;

export const Default: Story = {
  args: {
    items: {
      'components.metabar.lastUpdated': new Date().toLocaleDateString(),
      'components.metabar.readingTime': '15 minutes',
      'components.metabar.addedIn': 'v1.0.0',
      'components.metabar.author': 'The Node.js Project',
      'components.metabar.authors': (
        <AvatarGroup
          avatars={[
            {
              src: 'https://avatars.githubusercontent.com/canerakdas',
              alt: 'Caner Akdas',
            },
            {
              src: 'https://avatars.githubusercontent.com/bmuenzenmeyer',
              alt: 'Brian Muenzenmeyer',
            },
            {
              src: 'https://avatars.githubusercontent.com/ovflowd',
              alt: 'Claudio W',
            },
          ]}
        />
      ),
      'components.metabar.contribute': (
        <>
          <Image
            src="/static/images/logos/social-github-dark.svg"
            alt="GitHub Logo"
            width={16}
            height={16}
            data-on-light
          />
          <Image
            src="/static/images/logos/social-github.svg"
            alt="GitHub Logo"
            width={16}
            height={16}
            data-on-dark
          />
          <LocalizedLink href="/contribute">
            <FormattedMessage id="components.metabar.contributeText" />
          </LocalizedLink>
        </>
      ),
      'components.metabar.viewAs': (
        <>
          <CodeBracketIcon />
          <LocalizedLink href="/json">JSON</LocalizedLink>
        </>
      ),
    },
    headings: {
      items: [
        {
          value: 'OpenSSL update assessment, and Node.js project plans',
          depth: 1,
          data: { id: 'heading-1' },
        },
        {
          value: 'Summary',
          depth: 2,
          data: { id: 'summary' },
        },
        {
          value: 'Analysis',
          depth: 2,
          data: { id: 'analysis' },
        },
        {
          value: 'The c_rehash script allows command injection (CVE-2022-2068)',
          depth: 3,
          data: { id: 'the_c_rehash' },
        },
        {
          value: 'Contact and future updates',
          depth: 3,
          data: { id: 'contact_and_future_updates' },
        },
      ],
    },
  },
};

export default { component: MetaBar } as Meta;
