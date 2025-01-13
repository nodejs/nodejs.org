import { mapBlogCategoryToPreviewType } from '@/util/blogUtils';

describe('mapBlogCategoryToPreviewType', () => {
  test('returns the correct preview type for recognized categories', () => {
    expect(mapBlogCategoryToPreviewType('release')).toBe('release');
    expect(mapBlogCategoryToPreviewType('events')).toBe('announcements');
  });

  test('defaults to announcements for unknown categories', () => {
    expect(mapBlogCategoryToPreviewType('random')).toBe('announcements');
  });
});
