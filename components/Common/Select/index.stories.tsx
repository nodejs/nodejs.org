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
      {
        value: 'section-1',
        label: 'Getting Started',
      },
      {
        value: 'section-2',
        label: 'How to install Node.js',
      },
      {
        value: 'section-3',
        label: 'How much JavaScript do you need to know to use Node.js?',
      },
      {
        value: 'section-4',
        label: 'Differences between Node.js and the Browser',
      },
      {
        value: 'section-5',
        label: 'The V8 JavaScript Engine',
      },
      {
        value: 'section-6',
        label: 'An introduction to the NPM package manager',
      },
      {
        value: 'section-7',
        label: 'ECMAScript 2015 (ES6) and beyond',
      },
      {
        value: 'section-8',
        label: 'Node.js, the difference between development and production',
      },
    ],
    label: 'Getting Started',
    dropdownLabel: 'Getting Started',
    placeholder: 'Select a guide',
  },
};

export default { component: Select } as Meta;
