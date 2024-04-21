import type { PackageManager } from '@/types/release';
import type { UserOS } from '@/types/userOS';

// A utility enum to help convert `userOs` data type to user-readable format
export enum OperatingSystem {
  WIN = 'Windows',
  MAC = 'macOS',
  LINUX = 'Linux',
  AIX = 'AIX',
  OTHER = 'Other',
}

export const operatingSystemItems = [
  {
    label: OperatingSystem.WIN,
    value: 'WIN' as UserOS,
  },
  {
    label: OperatingSystem.MAC,
    value: 'MAC' as UserOS,
  },
  {
    label: OperatingSystem.LINUX,
    value: 'LINUX' as UserOS,
  },
  {
    label: OperatingSystem.AIX,
    value: 'AIX' as UserOS,
  },
];

export const platformItems = [
  {
    label: 'fnm',
    value: 'FNM' as PackageManager,
  },
  {
    label: 'NVM',
    value: 'NVM' as PackageManager,
  },
  {
    label: 'Brew',
    value: 'BREW' as PackageManager,
  },
  {
    label: 'Chocolatey',
    value: 'CHOCO' as PackageManager,
  },
  {
    label: 'Docker',
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
    link:
      category === 'download'
        ? `/${[page, subCategory].filter(Boolean).join('/')}`
        : `/${[page, category, subCategory].filter(Boolean).join('/')}`,
  }));
