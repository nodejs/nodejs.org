import { useState } from 'react';
import DownloadToggle from './index';
import type { Props } from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

const Template = ({ selected }: Props) => {
  const [selectedTypeRelease, setSelectedTypeRelease] = useState(selected);

  const handleTypeReleaseToggle = (value: string) => {
    setSelectedTypeRelease(value);
  };

  return (
    <DownloadToggle
      selected={selectedTypeRelease}
      handleClick={handleTypeReleaseToggle}
    />
  );
};

type Story = StoryObj<typeof Template>;
type Meta = MetaObj<typeof Template>;

export const Default: Story = {
  args: { selected: 'LTS' },
};

export const Current: Story = {
  args: { selected: 'CURRENT' },
};

export default {
  component: Template,
  args: { showDescription: true },
} as Meta;
