import type { PackageManager } from '@/types/release';
import type { UserOS } from '@/types/userOS';

export enum OperatingSystemLabel {
  WIN = 'Windows',
  MAC = 'macOS',
  LINUX = 'Linux',
  AIX = 'AIX',
  OTHER = 'Other',
}

export enum PackageManagerLabel {
  NVM = 'nvm',
  FNM = 'fnm',
  BREW = 'Brew',
  CHOCO = 'Chocolatey',
  DOCKER = 'Docker',
}

export const operatingSystemItems = [
  {
    label: OperatingSystemLabel.WIN,
    value: 'WIN' as UserOS,
  },
  {
    label: OperatingSystemLabel.MAC,
    value: 'MAC' as UserOS,
  },
  {
    label: OperatingSystemLabel.LINUX,
    value: 'LINUX' as UserOS,
  },
  {
    label: OperatingSystemLabel.AIX,
    value: 'AIX' as UserOS,
  },
];

export const platformItems = [
  {
    label: PackageManagerLabel.NVM,
    value: 'NVM' as PackageManager,
  },
  {
    label: PackageManagerLabel.FNM,
    value: 'FNM' as PackageManager,
  },
  {
    label: PackageManagerLabel.BREW,
    value: 'BREW' as PackageManager,
  },
  {
    label: PackageManagerLabel.CHOCO,
    value: 'CHOCO' as PackageManager,
  },
  {
    label: PackageManagerLabel.DOCKER,
    value: 'DOCKER' as PackageManager,
  },
];

export const bitnessItems = {
  WIN: [
    {
      label: 'x64',
      value: '64',
    },
    {
      label: 'x86',
      value: '86',
    },
    {
      label: 'ARM64',
      value: 'arm64',
    },
  ],
  MAC: [
    {
      label: 'x64',
      value: '64',
    },
    {
      label: 'ARM64',
      value: 'arm64',
    },
  ],
  LINUX: [
    {
      label: 'x64',
      value: '64',
    },
    {
      label: 'ARMv7',
      value: 'armv7l',
    },
    {
      label: 'ARM64',
      value: 'arm64',
    },
    {
      label: 'Power LE',
      value: 'ppc64le',
    },
    {
      label: 'System Z',
      value: 's390x',
    },
  ],
  AIX: [
    {
      label: 'Power',
      value: 'ppc64',
    },
  ],
  OTHER: [],
  LOADING: [],
};

type formatDropdownItemsType = {
  items: Array<{ label: string; value: string }>;
  disabledItems?: Array<string>;
  icons?: Record<string, JSX.Element>;
  defaultIcon?: JSX.Element;
};

// Formats the dropdown items to be used in the `Select` component in the
// download page and adds the icons, and disabled status to the dropdown items.
export const formatDropdownItems = ({
  items,
  disabledItems = [],
  icons = {},
  defaultIcon,
}: formatDropdownItemsType) =>
  items.map(item => ({
    ...item,
    disabled: disabledItems.includes(item.value),
    iconImage: icons[item.value] || defaultIcon,
  }));

// Returns the page, category and subCategoy information to be used in the page
// from the pathname information on the download pages.
export const getDownloadCategory = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const [, c] = segments;

  if (c === 'current' || typeof c === 'undefined') {
    segments.unshift('download');
  }

  const [page, category, subCategory] = segments;

  return { page, category, subCategory };
};

type CategoryTabMappingParams = {
  page: string;
  categories: Array<{ category: string; label: string }>;
  subCategory: string;
};

// Utility method used to create URLs and labels to be used in Tabs
export const mapCategoriesToTabs = ({
  page,
  categories,
  subCategory,
}: CategoryTabMappingParams) =>
  categories.map(({ category, label }) => ({
    key: category,
    label: label,
    link: `/${[page, category, subCategory].filter(Boolean).join('/')}`,
  }));
