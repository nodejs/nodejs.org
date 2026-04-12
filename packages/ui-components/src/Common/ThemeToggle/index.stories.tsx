import ThemeToggle from '#ui/Common/ThemeToggle';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof ThemeToggle>;
type Meta = MetaObj<typeof ThemeToggle>;

const defaultLabels = { system: 'System', light: 'Light', dark: 'Dark' };

export const Default: Story = {
  args: {
    ariaLabel: 'Select theme',
    currentTheme: 'system',
    themeLabels: defaultLabels,
    onChange: () => {},
  },
};

export const LightSelected: Story = {
  args: {
    ariaLabel: 'Select theme',
    currentTheme: 'light',
    themeLabels: defaultLabels,
    onChange: () => {},
  },
};

export const DarkSelected: Story = {
  args: {
    ariaLabel: 'Select theme',
    currentTheme: 'dark',
    themeLabels: defaultLabels,
    onChange: () => {},
  },
};

export default { component: ThemeToggle } as Meta;
