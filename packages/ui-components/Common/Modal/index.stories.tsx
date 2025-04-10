import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import ChangelogModal from '@node-core/ui-components/Common/Modal';

type Story = StoryObj<typeof ChangelogModal>;
type Meta = MetaObj<typeof ChangelogModal>;

export const Default: Story = {
  args: {
    open: false,
    heading: 'Node.js Versions Infomation',
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

export default { component: ChangelogModal } as Meta;
