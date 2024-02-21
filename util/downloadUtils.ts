import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';
import type { UserOS } from '@/types/userOS';

// A utility enum to help convert `userOs` data type to user-readable format
export enum OperatingSystem {
  WIN = 'Windows',
  MAC = 'MacOS',
  LINUX = 'Linux',
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
];

export const platformItems = [
  {
    label: 'NVM',
    value: 'NVM',
  },
  {
    label: 'Brew',
    value: 'BREW',
  },
  {
    label: 'fvm',
    value: 'FWM',
  },
];

export const bitnessItems = {
  WIN: [
    {
      label: '32-bit',
      value: '86',
    },
    {
      label: '64-bit',
      value: '64',
    },
    {
      label: 'ARM64',
      value: 'arm64',
    },
  ],
  MAC: [
    {
      label: '64-bit / ARM64',
      value: '64',
    },
  ],
  LINUX: [],
  OTHER: [],
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
  /**
   * @deprecated once the website redesign happens remove this code block
   */
  if (ENABLE_WEBSITE_REDESIGN) {
    pathname = pathname.replace('/new-design', '');
  }

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
