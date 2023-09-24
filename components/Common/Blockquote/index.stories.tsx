import Blockquote from './';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Blockquote>;
type Meta = MetaObj<typeof Blockquote>;

export const Default: Story = {
  args: {
    children: (
      <>
        <p>
          “An expert is a person who has made all the mistakes that can be made
          in a very narrow field.”
        </p>
        <cite>Niels Bohr</cite>
      </>
    ),
  },
};

export const Without_Attribution: Story = {
  args: {
    children: (
      <p>
        “Commander Keen soared through the stars, leaving behind a galaxy of
        memories, adventure, and boundless imagination. In the realm of gaming,
        his farewell echoes as a timeless voyage into the hearts of those who
        dare to dream and explore the unknown.”
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
        <Blockquote>
          <p>
            “A thinker sees his own actions as experiments and questions--as
            attempts to find out something. Success and failure are for him
            answers above all.”
          </p>
          <cite>Friedrich Nietzsche</cite>
        </Blockquote>
        <cite>Aldous Huxley, Brave New World</cite>
      </>
    ),
  },
};

export default { component: Blockquote } as Meta;
