import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const H1Special: StoryObj = {
  render: () => <h1 className="special">Special H1</h1>,
};

export default { title: 'Design System' } as MetaObj;
