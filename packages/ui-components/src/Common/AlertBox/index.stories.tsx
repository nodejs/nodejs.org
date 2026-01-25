import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

import AlertBox from '#ui/Common/AlertBox';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof AlertBox>;
type Meta = MetaObj<typeof AlertBox>;

const withMain = (args: React.ComponentProps<typeof AlertBox>) => (
  <main>
    <AlertBox {...args} />
  </main>
);

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

export const Neutral: Story = {
  args: {
    level: 'neutral',
    title: 'Note',
    children:
      "This is a neutral informational message that doesn't fit into the other alert categories.",
    size: 'default',
  },
};

export const InMarkdown: Story = {
  args: {
    level: 'danger',
    title: '0',
    children: (
      <>
        In a markdown component, <code>Code renders correctly,</code>{' '}
        <a href="#">
          <code>even when in a link</code>
        </a>
      </>
    ),
    size: 'default',
  },
  render: withMain,
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

export const NoTitle: Story = {
  args: {
    level: 'info',
    children: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
        quasi doloremque. Totam, earum velit, sunt voluptates fugiat beatae
        praesentium quis magni explicabo repudiandae nam aut molestias ex ad
        sequi eum!
      </p>
    ),
    size: 'default',
  },
};

export const SmallContainer: Story = {
  render: args => (
    <div className="w-200">
      <AlertBox {...args} />
    </div>
  ),
  args: {
    level: 'info',
    title: 'Stability: 3',
    children: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
        quasi doloremque. Totam, earum velit, sunt voluptates fugiat beatae
        praesentium quis magni explicabo repudiandae nam aut molestias ex ad
        sequi eum!
      </p>
    ),
    size: 'default',
  },
};

export const WithLongContent: Story = {
  args: {
    level: 'warning',
    title: 'Stability: 1',
    children: (
      <span>
        Experimental. Please migrate away from this API, if you can. We do not
        recommend using the{' '}
        <a href="#async_hookscreatehookcallbacks">
          <code>createHook</code>
        </a>
        ,{' '}
        <a href="#class-asynchook">
          <code>AsyncHook</code>
        </a>
        , and
        <a href="#async_hooksexecutionasyncresource">
          <code>executionAsyncResource</code>
        </a>{' '}
        APIs as they have usability issues, safety risks, and performance
        implications. Async context tracking use cases are better served by the
        stable{' '}
        <a href="async_context.html#class-asynclocalstorage">
          <code>AsyncLocalStorage</code>
        </a>{' '}
        API. If you have a use case for
        <code>createHook</code>, <code>AsyncHook</code>, or{' '}
        <code>executionAsyncResource</code> beyond the context tracking need
        solved by{' '}
        <a href="async_context.html#class-asynclocalstorage">
          <code>AsyncLocalStorage</code>
        </a>{' '}
        or diagnostics data currently provided by{' '}
        <a href="diagnostics_channel.html">Diagnostics Channel</a>, please open
        an issue at{' '}
        <a href="https://github.com/nodejs/node/issues">
          https://github.com/nodejs/node/issues
        </a>{' '}
        describing your use case so we can create a more purpose-focused API.
      </span>
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
