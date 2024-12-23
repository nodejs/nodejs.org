import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import AlertBox from '@/components/Common/AlertBox';

type Story = StoryObj<typeof AlertBox>;
type Meta = MetaObj<typeof AlertBox>;

export const Info: Story = {
  args: {
    level: 'info',
    title: '3',
    children:
      'Legacy. Although this feature is unlikely to be removed and is still covered by semantic versioning guarantees, it is no longer actively maintained, and other alternatives are available.',
    size: 'default',
  },
};

export const Success: Story = {
  args: {
    level: 'success',
    title: '2',
    children:
      'Stable. Compatibility with the npm ecosystem is a high priority.',
    size: 'default',
  },
};

export const Warning: Story = {
  args: {
    level: 'warning',
    title: '1',
    children:
      'Experimental. The feature is not subject to semantic versioning rules. Non-backward compatible changes or removal may occur in any future release. Use of the feature is not recommended in production environments. Experimental features are subdivided into stages:',
    size: 'default',
  },
};

export const Danger: Story = {
  args: {
    level: 'danger',
    title: '0',
    children:
      'Deprecated. The feature may emit warnings. Backward compatibility is not guaranteed.',
    size: 'default',
  },
};

export const WithIcon: Story = {
  args: {
    level: 'info',
    title: '3',
    children: (
      <p>
        Lorem ipsum dolor sit amet <ExclamationCircleIcon /> consectetur
        adipisicing elit. Inventore, quasi doloremque. Totam, earum velit, sunt
        voluptates fugiat beatae praesentium quis magni explicabo repudiandae
        nam aut molestias ex ad sequi eum!
      </p>
    ),
    size: 'default',
  },
};

export default {
  component: AlertBox,
  argTypes: {
    size: {
      options: ['default', 'small'],
      control: { type: 'radio' },
    },
  },
} as Meta;
