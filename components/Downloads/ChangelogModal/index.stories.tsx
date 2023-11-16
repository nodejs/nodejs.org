import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Button from '@/components/Common/Button';

import ChangelogModal from '.';

type Story = StoryObj<typeof ChangelogModal>;
type Meta = MetaObj<typeof ChangelogModal>;

// If the component has any props that are interactable, they should be passed here
// We recommend reading Storybook docs for args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultLightStory: Story = {
  args: {
    trigger: <Button>Trigger</Button>,
    heading: 'Big patch',
    subheading: 'Version 1.0.0',
    avatars: [
      {
        alt: 'Cole Westbrook',
        src: 'https:avatars.githubusercontent.com/u/',
      },
    ],
  },
};

// If the Component has more than one State/Layout/Variant, there should be one Story for each variant
export const DarkStory: Story = {
  args: {},
};

export default { component: ChangelogModal } as Meta;
