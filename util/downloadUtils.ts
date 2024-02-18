import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';
import type { UserOS } from '@/types/userOS';

export enum OperatingSystem {
  WIN = 'Windows',
  MAC = 'MacOs',
  LINUX = 'Linux',
  OTHER = 'Other',
}

export const installerBitnessMap = (os: UserOS, hasWindowsArm64: boolean) => {
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

export const mapCategoriesToTabs = ({
  page,
  categories,
  subCategory,
}: {
  page: string;
  categories: Array<{ category: string; label: string }>;
  subCategory: string;
}) =>
  categories.map(({ category, label }) => ({
    key: category,
    label: label,
    link:
      category === 'download'
        ? `/${[page, subCategory].join('/')}`
        : `/${[page, category, subCategory].join('/')}`,
  }));
