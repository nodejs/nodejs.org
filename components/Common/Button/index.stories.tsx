import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Button from './';
import classNames from 'classnames';

type Story = StoryObj<typeof Button>;
type Meta = MetaObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Download Node (LTS)',
    disabled: false,
  },
  decorators: [
    (Story, { args }) => (
      <>
        <div
          className={classNames({
            'bg-[#000000] w-fit rounded-md': args.variant === 'special',
          })}
        >
          <Story />
        </div>
      </>
    ),
  ],
};
export default { component: Button } as Meta;
