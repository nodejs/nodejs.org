import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Select from '.';

type Story = StoryObj<typeof Select>;
type Meta = MetaObj<typeof Select>;

export const Default: Story = {
  args: {
    values: ['v20.8.0', 'v19.9.0', 'v18.18.0', 'v17.9.1', 'v16.20.2'],
    defaultValue: 'v16.20.2',
    label: 'Node.js version',
  },
};

export const Withouth_Label: Story = {
  args: {
    values: ['v20.8.0', 'v19.9.0', 'v18.18.0', 'v17.9.1', 'v16.20.2'],
    defaultValue: 'v16.20.2',
  },
};

export const Dropdown_Label: Story = {
  args: {
    values: [
      'Introduction to Node.js',
      'How to install Node.js',
      'How much JavaScript do you need to know to use Node.js?',
      'Differences between Node.js and the Browser',
      'The V8 JavaScript Engine',
      'An introduction to the NPM package manager',
      'ECMAScript 2015 (ES6) and beyond',
      'Node.js, the difference between development and production',
    ],
    label: 'Getting Started',
    dropdownLabel: 'Getting Started',
    placeholder: 'Select a guide',
  },
};

export default { component: Select } as Meta;
