import DarkModeToggle from '.';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../../../providers/themeprovider';

const meta: Meta<typeof DarkModeToggle> = {
  title: 'DarkModeToggle',
  component: DarkModeToggle,
};

export default meta;

type Story = StoryObj<typeof DarkModeToggle>;

export const Toggle: Story = {
  render: () => {
    return (
      <ThemeProvider>
        <DarkModeToggle />
      </ThemeProvider>
    );
  },
};
