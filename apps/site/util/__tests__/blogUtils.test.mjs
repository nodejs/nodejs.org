import assert from 'node:assert';
import { describe, it } from 'node:test';

import { mapBlogCategoryToPreviewType } from '@/util/blogUtils';

describe('mapBlogCategoryToPreviewType', () => {
  it('returns the correct preview type for recognized categories', () => {
    assert.strictEqual(mapBlogCategoryToPreviewType('release'), 'release');
    assert.strictEqual(mapBlogCategoryToPreviewType('events'), 'announcements');
  });

  it('defaults to announcements for unknown categories', () => {
    assert.strictEqual(mapBlogCategoryToPreviewType('random'), 'announcements');
  });
});
