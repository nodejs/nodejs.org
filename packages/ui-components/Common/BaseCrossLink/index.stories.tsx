import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import BaseCrossLink from '@node-core/ui-components/Common/BaseCrossLink';

type Story = StoryObj<typeof BaseCrossLink>;
type Meta = MetaObj<typeof BaseCrossLink>;

export const Prev: Story = {
  args: {
    type: 'previous',
    text: 'How to install Node.js',
    link: 'https://nodejs.dev/en/learn/how-to-install-nodejs/',
  },
  decorators: [
    Story => (
      <div className="w-[305px]">
        <Story />
      </div>
    ),
  ],
};

export const Next: Story = {
  args: {
    type: 'next',
    text: 'How much JavaScript do you need to know to use Node.js?',
    link: 'https://nodejs.dev/en/learn/how-much-javascript-do-you-need-to-know-to-use-nodejs/',
  },
  decorators: [
    Story => (
      <div className="w-[305px]">
        <Story />
      </div>
    ),
  ],
};

export default { component: BaseCrossLink } as Meta;
