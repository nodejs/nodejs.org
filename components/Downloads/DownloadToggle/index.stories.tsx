import { useState } from 'react';
import DownloadToggle from './index';
import type { FC } from 'react';
import type { DownloadToggleProps } from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

const Template: FC<DownloadToggleProps> = ({ selected, showDescription }) => {
  const [selectedTypeRelease, setSelectedTypeRelease] = useState(selected);

  const handleTypeReleaseToggle = (value: string) => {
    setSelectedTypeRelease(value);
  };

  return (
    <DownloadToggle
      selected={selectedTypeRelease}
      handleClick={handleTypeReleaseToggle}
      showDescription={showDescription}
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
