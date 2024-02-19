import {
  getBitnessItems,
  getDownloadCategory,
  mapCategoriesToTabs,
} from '@/util/downloadUtils';

describe('getBitnessItems', () => {
  it('should return correct bitness items for Windows with ARM64', () => {
    const result = getBitnessItems('WIN', true);

    expect(result).toEqual([
      { label: '32-bit', value: '86' },
      { label: '64-bit', value: '64' },
      { label: 'ARM64', value: 'arm64', disabled: false },
    ]);
  });

  it('should return correct bitness items for Windows without ARM64', () => {
    const result = getBitnessItems('WIN', false);

    expect(result).toEqual([
      { label: '32-bit', value: '86' },
      { label: '64-bit', value: '64' },
      { label: 'ARM64', value: 'arm64', disabled: true },
    ]);
  });

  it('should return correct bitness items for MacOs', () => {
    const result = getBitnessItems('MAC', false);

    expect(result).toEqual([{ label: '64-bit / ARM64', value: '64' }]);
  });

  it('should return empty array for Linux and Other', () => {
    expect(getBitnessItems('LINUX', false)).toEqual([]);
    expect(getBitnessItems('OTHER', false)).toEqual([]);
  });
});

describe('getDownloadCategory', () => {
  it('should return correct category information for /download/current', () => {
    const result = getDownloadCategory('/download/current');

    expect(result).toEqual({
      page: 'download',
      category: 'download',
      subCategory: 'current',
    });
  });

  it('should return correct category information for /download/category/subcategory', () => {
    const result = getDownloadCategory('/download/category/subcategory');

    expect(result).toEqual({
      page: 'download',
      category: 'category',
      subCategory: 'subcategory',
    });
  });

  it('should return correct category information for /download/category', () => {
    const result = getDownloadCategory('/download/category');

    expect(result).toEqual({
      page: 'download',
      category: 'category',
      subCategory: undefined,
    });
  });
});

describe('mapCategoriesToTabs', () => {
  it('should return correct tabs for download page when subcategory current', () => {
    const result = mapCategoriesToTabs({
      page: 'download',
      categories: [
        {
          category: 'download',
          label: 'Download',
        },
        {
          category: 'package-manager',
          label: 'Package Manager',
        },
      ],
      subCategory: 'current',
    });

    expect(result).toEqual([
      { key: 'download', label: 'Download', link: '/download/current' },
      {
        key: 'package-manager',
        label: 'Package Manager',
        link: '/download/package-manager/current',
      },
    ]);
  });

  it('should return correct tabs for download page when subcategory not defined', () => {
    const result = mapCategoriesToTabs({
      page: 'download',
      categories: [
        {
          category: 'download',
          label: 'Download',
        },
        {
          category: 'package-manager',
          label: 'Package Manager',
        },
      ],
    });

    expect(result).toEqual([
      { key: 'download', label: 'Download', link: '/download' },
      {
        key: 'package-manager',
        label: 'Package Manager',
        link: '/download/package-manager',
      },
    ]);
  });
});
