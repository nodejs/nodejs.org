import LanguageSelector from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof LanguageSelector>;
type Meta = MetaObj<typeof LanguageSelector>;

export const Default: Story = {};

const containerStyles = { marginLeft: '200px' } as const;

export default {
  component: LanguageSelector,
  decorators: [
    Story => (
      <div style={containerStyles}>
        <Story />
      </div>
    ),
  ],
} as Meta;
