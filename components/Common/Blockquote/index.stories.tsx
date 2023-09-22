import Blockquote from './';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Blockquote>;
type Meta = MetaObj<typeof Blockquote>;

export const Default: Story = {
  args: {
    children: (
      <p>
        “Words can be like X-rays, if you use them properly—they’ll go through
        anything. You read and you’re pierced.”
      </p>
    ),
    cite: 'https://www.huxley.net/bnw/four.html',
    attribution: 'Aldous Huxley, Brave New World',
  },
};

export const Without_Attribution: Story = {
  args: {
    children: (
      <p>
        “Words can be like X-rays, if you use them properly—they’ll go through
        anything. You read and you’re pierced.”
      </p>
    ),
  },
};

export const Nested: Story = {
  args: {
    children: (
      <>
        <p>
          “Words can be like X-rays, if you use them properly—they’ll go through
          anything. You read and you’re pierced.”
        </p>
        <Blockquote attribution="Nested Blockquote, Storybook">
          <p>
            It showed her glimpses of the past, revealing that the anomaly had
            been triggered by an experiment gone awry—a desperate attempt to
            harness unlimited energy.
          </p>
        </Blockquote>
      </>
    ),
    cite: 'https://www.huxley.net/bnw/four.html',
    attribution: 'Aldous Huxley, Brave New World',
  },
};

export default { component: Blockquote } as Meta;
