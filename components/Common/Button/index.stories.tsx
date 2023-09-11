import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

const meta = {
  component: Button,
  argTypes: {
    variant: ['primary', 'secondary'],
  },
} satisfies Meta<typeof Button>;
type Story = StoryObj<typeof meta>;

/**
 * Primary
 */

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

export const PrimaryLightDefault: Story = {
  render: () => <Button>Primary Light Default</Button>,
};

export const PrimaryLightHover: Story = {
  render: () => <Button id="primary-light-hover">Primary Light Hover</Button>,
};

PrimaryLightHover.parameters = {
  pseudo: {
    hover: '#primary-light-hover',
  },
};

export const PrimaryLightFocus: Story = {
  render: () => <Button id="primary-light-focus">Primary Light Focus</Button>,
};

PrimaryLightFocus.parameters = {
  pseudo: {
    focus: '#primary-light-focus',
  },
};

export const PrimaryLightDisabled: Story = {
  render: () => (
    <Button id="primary-light-disabled" disabled>
      Primary Light Disabled
    </Button>
  ),
};

/**
 * Primary Dark
 */

export const PrimaryDarkDefault: Story = {
  render: () => <Button>Primary Dark Default</Button>,
};

export const PrimaryDarkHover: Story = {
  render: () => <Button id="primary-dark-hover">Primary Dark Hover</Button>,
};

PrimaryDarkHover.parameters = {
  pseudo: {
    hover: '#primary-dark-hover',
  },
};

export const PrimaryDarkFocus: Story = {
  render: () => <Button id="primary-dark-focus">Primary Dark Focus</Button>,
};

PrimaryDarkFocus.parameters = {
  pseudo: {
    focus: '#primary-dark-focus',
  },
};

export const PrimaryDarkDisabled: Story = {
  render: () => <Button disabled>Primary Dark Disabled</Button>,
};

/**
 * Secondary
 */

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const SecondaryLightDefault: Story = {
  render: () => <Button variant="secondary">Secondary Light Default</Button>,
};

export const SecondaryLightHover: Story = {
  render: () => (
    <Button id="secondary-light-hover" variant="secondary">
      Secondary Light Hover
    </Button>
  ),
};

SecondaryLightHover.parameters = {
  pseudo: {
    hover: '#secondary-light-hover',
  },
};

export const SecondaryLightFocus: Story = {
  render: () => (
    <Button id="secondary-light-focus" variant="secondary">
      Secondary Light Focus
    </Button>
  ),
};

SecondaryLightFocus.parameters = {
  pseudo: {
    focus: '#secondary-light-focus',
  },
};

export const SecondaryLightDisabled: Story = {
  render: () => (
    <Button variant="secondary" disabled>
      Secondary Light Disabled
    </Button>
  ),
};

export const SecondaryDarkDefault: Story = {
  render: () => (
    <div data-theme="dark" className="bg-black p-2">
      <Button variant="secondary">Secondary Dark Default</Button>
    </div>
  ),
};

export const SecondaryDarkHover: Story = {
  render: () => (
    <div data-theme="dark" className="bg-black p-2">
      <Button id="secondary-dark-hover" variant="secondary">
        Secondary Dark Hover
      </Button>
    </div>
  ),
};

SecondaryDarkHover.parameters = {
  pseudo: {
    hover: '#secondary-dark-hover',
  },
};

export const SecondaryDarkFocus: Story = {
  render: () => (
    <div data-theme="dark" className="bg-black p-2 dark">
      <Button id="secondary-dark-focus" variant="secondary">
        Secondary Dark Focus
      </Button>
    </div>
  ),
};

SecondaryDarkFocus.parameters = {
  pseudo: {
    focus: '#secondary-dark-focus',
  },
};

export const SecondaryDarkDisabled: Story = {
  render: () => (
    <div data-theme="dark" className="bg-black p-2 dark">
      <Button variant="secondary" disabled>
        Secondary Dark Disabled
      </Button>
    </div>
  ),
};

/**
 * Special
 */

export const Special: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary" special>
        Download Node (LTS)
      </Button>
      <Button variant="secondary" special>
        Secondary
      </Button>
    </div>
  ),
};

export const SpecialPrimaryDefault: Story = {
  render: () => (
    <Button variant="primary" special>
      Special Primary Default
    </Button>
  ),
};

export const SpecialPrimaryHover: Story = {
  render: () => (
    <Button id="special-primary-light-hover" variant="primary" special>
      Special Primary Hover
    </Button>
  ),
};

SpecialPrimaryHover.parameters = {
  pseudo: {
    hover: '#special-primary-light-hover',
  },
};

export const SpecialPrimaryFocus: Story = {
  render: () => (
    <Button id="special-primary-light-focus" variant="primary" special>
      Special Primary Focus
    </Button>
  ),
};

SpecialPrimaryFocus.parameters = {
  pseudo: {
    focus: '#special-primary-light-focus',
  },
};

export const SpecialPrimaryDisabled: Story = {
  render: () => (
    <Button variant="primary" special disabled>
      Special Primary Disabled
    </Button>
  ),
};

export const SpecialSecondaryDefault: Story = {
  render: () => (
    <Button variant="secondary" special>
      Special Secondary Default
    </Button>
  ),
};

export const SpecialSecondaryHover: Story = {
  render: () => (
    <Button id="special-secondary-light-hover" variant="secondary" special>
      Special Secondary Hover
    </Button>
  ),
};

SpecialSecondaryHover.parameters = {
  pseudo: {
    hover: '#special-secondary-light-hover',
  },
};

export const SpecialSecondaryFocus: Story = {
  render: () => (
    <Button id="special-secondary-light-focus" variant="secondary" special>
      Special Secondary Focus
    </Button>
  ),
};

SpecialSecondaryFocus.parameters = {
  pseudo: {
    focus: '#special-secondary-light-focus',
  },
};

export const SpecialSecondaryDisabled: Story = {
  render: () => (
    <Button variant="secondary" special disabled>
      Special Secondary Disabled
    </Button>
  ),
};

export default meta;
