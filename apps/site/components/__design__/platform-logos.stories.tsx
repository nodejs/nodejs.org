import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import OSIcons from '@/components/Icons/OperatingSystem';
import PlatformIcons from '@/components/Icons/Platform';

export const PlatformLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center gap-4">
        <OSIcons.Apple width={64} height={64} />
        <OSIcons.Linux width={64} height={64} />
        <OSIcons.Microsoft width={64} height={64} />
        <OSIcons.AIX width={64} height={64} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <PlatformIcons.Docker width={64} height={64} />
        <PlatformIcons.Homebrew width={64} height={64} />
        <PlatformIcons.NVM width={64} height={64} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <PlatformIcons.Choco width={64} height={64} />
      </div>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
