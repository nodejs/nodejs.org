import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Modal from '#ui/Common/Modal';

type Story = StoryObj<typeof Modal>;
type Meta = MetaObj<typeof Modal>;

export const Default: Story = {
  args: {
    open: true,
    heading: 'Node.js Versions Information',
    subheading: 'Get all information about Node.js versions and their changes.',
    children: (
      <>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          atque sint doloremque, sapiente recusandae debitis libero nostrum
          repudiandae explicabo suscipit ipsam eos dolorem, necessitatibus odit
          quos delectus natus sunt sit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum
          asperiores corporis tempore neque, officiis fuga est facere deserunt
          amet minus sit architecto blanditiis hic sed odit cumque numquam
          dignissimos delectus.
        </p>
      </>
    ),
  },
};

export default { component: Modal } as Meta;
