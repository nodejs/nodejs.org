import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { mapBlogCategoryToPreviewType } from '#site/util/blog';

describe('mapBlogCategoryToPreviewType', () => {
  it('returns the correct preview type for recognized categories', () => {
    assert.equal(mapBlogCategoryToPreviewType('release'), 'release');
    assert.equal(mapBlogCategoryToPreviewType('events'), 'announcements');
  });

  it('defaults to announcements for unknown categories', () => {
    assert.equal(mapBlogCategoryToPreviewType('random'), 'announcements');
  });
});
