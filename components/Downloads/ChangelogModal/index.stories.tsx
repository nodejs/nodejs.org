import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Button from '@/components/Common/Button';
import ChangelogModal from '@/components/Downloads/ChangelogModal';
import { githubProfileAvatarUrl } from '@/util/gitHubUtils';

type Story = StoryObj<typeof ChangelogModal>;
type Meta = MetaObj<typeof ChangelogModal>;

const names = [
  'ovflowd',
  'bmuenzenmeyer',
  'AugustinMauroy',
  'HinataKah0',
  'Harkunwar',
  'rodion-arr',
  'mikeesto',
  'bnb',
  'benhalverson',
  'aymen94',
  'shanpriyan',
  'Wai-Dung',
  'manishprivet',
  'araujogui',
  'thefossildev',
];

export const Default: Story = {
  args: {
    trigger: <Button>Trigger</Button>,
    heading: 'Node v18.17.0',
    subheading: "2023-07-18, Version 18.17.0 'Hydrogen' (LTS), @danielleadams",
    avatars: [
      ...names.map(name => ({ src: githubProfileAvatarUrl(name), alt: name })),
    ],
    // children: <></>, TODO: Add linked filler html
  },
};

export default { component: ChangelogModal } as Meta;
