import {
  getDownloadCategory,
  mapCategoriesToTabs,
  formatDropdownItems,
} from '@/util/downloadUtils';

describe('formatDropdownItems', () => {
  it('should format dropdown items correctly', () => {
    const items = [
      { value: 'item1', label: 'Item 1' },
      { value: 'item2', label: 'Item 2' },
    ];
    const disabledItems = ['item2'];
    const icons = { item1: 'icon' };
    const defaultIcon = 'defaultIcon';

    const result = formatDropdownItems({
      items: items,
      disabledItems: disabledItems,
      icons: icons,
      defaultIcon: defaultIcon,
    });

    expect(result).toEqual([
      { value: 'item1', label: 'Item 1', disabled: false, iconImage: 'icon' },
      {
        value: 'item2',
        label: 'Item 2',
        disabled: true,
        iconImage: 'defaultIcon',
      },
    ]);
  });

  it('should mark all items as disabled when all items are in the disabledItems list', () => {
    const items = [
      { value: 'item1', label: 'Item 1' },
      { value: 'item2', label: 'Item 2' },
    ];
    const disabledItems = ['item1', 'item2'];

    const result = formatDropdownItems({
      items: items,
      disabledItems: disabledItems,
    });

    expect(result).toEqual([
      { value: 'item1', label: 'Item 1', disabled: true },
      { value: 'item2', label: 'Item 2', disabled: true },
    ]);
  });

  it('should not mark any items as disabled when disabledItems list is empty', () => {
    const items = [
      { value: 'item1', label: 'Item 1' },
      { value: 'item2', label: 'Item 2' },
    ];

    const result = formatDropdownItems({ items: items });

    expect(result).toEqual([
      { value: 'item1', label: 'Item 1', disabled: false },
      { value: 'item2', label: 'Item 2', disabled: false },
    ]);
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
          category: 'prebuilt-binaries',
          label: 'Prebuilt Binaries',
        },
        {
          category: 'package-manager',
          label: 'Package Manager',
        },
      ],
      subCategory: 'current',
    });

    expect(result).toEqual([
      {
        key: 'prebuilt-binaries',
        label: 'Prebuilt Binaries',
        link: '/download/prebuilt-binaries/current',
      },
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
          category: 'prebuilt-binaries',
          label: 'Prebuilt Binaries',
        },
        {
          category: 'package-manager',
          label: 'Package Manager',
        },
      ],
    });

    expect(result).toEqual([
      {
        key: 'prebuilt-binaries',
        label: 'Prebuilt Binaries',
        link: '/download/prebuilt-binaries',
      },
      {
        key: 'package-manager',
        label: 'Package Manager',
        link: '/download/package-manager',
      },
    ]);
  });
});
