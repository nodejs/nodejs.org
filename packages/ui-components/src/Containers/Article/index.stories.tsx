import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

import Article from '.';

type Story = StoryObj<typeof Article>;
type Meta = MetaObj<typeof Article>;

const Sidebar = () => (
  <div className="text-center">
    <h3>Sidebar</h3>
    <ul>
      <li>Navigation Item 1</li>
      <li>Navigation Item 2</li>
      <li>Navigation Item 3</li>
      <li>Navigation Item 4</li>
    </ul>
  </div>
);

export const Default: Story = {
  args: {
    children: (
      <>
        <Sidebar />
        <div>
          <main>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </main>
          <Sidebar />
        </div>
      </>
    ),
  },
};

export default { component: Article } as Meta;
