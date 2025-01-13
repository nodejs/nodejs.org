import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import InstallMethodIcons from '@/components/Icons/InstallationMethod';
import OSIcons from '@/components/Icons/OperatingSystem';

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
        <InstallMethodIcons.Docker width={64} height={64} />
        <InstallMethodIcons.Homebrew width={64} height={64} />
        <InstallMethodIcons.NVM width={64} height={64} />
        <InstallMethodIcons.Devbox width={64} height={64} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <InstallMethodIcons.Choco width={64} height={64} />
      </div>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
