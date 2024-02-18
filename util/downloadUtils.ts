import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';
import type { UserOS } from '@/types/userOS';

// A utility enum to help convert `userOs` data type to user-readable format
export enum OperatingSystem {
  WIN = 'Windows',
  MAC = 'MacOs',
  LINUX = 'Linux',
  OTHER = 'Other',
}

// A utility for creating and filtering bitness items updates the diabled status
// based on `hasWindowsArm64` status.
// @todo In case this method needs more than one filter, an exclude method can
// be written
export const getBitnessItems = (os: UserOS, hasWindowsArm64: boolean) => {
  const bitnessMap = {
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
        disabled: !hasWindowsArm64,
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

  return bitnessMap[os];
};

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
        ? `/${[page, subCategory].join('/')}`
        : `/${[page, category, subCategory].join('/')}`,
  }));
