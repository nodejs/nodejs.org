import { getBlogPosts, getBlogCategories, getBlogTags } from '@/util/blogUtils';

describe('blogUtils', () => {
  describe('getBlogPosts', () => {
    it('should retrieve blog posts', () => {
      const blogPosts = getBlogPosts();
      expect(blogPosts).toBeDefined();
      expect(Array.isArray(blogPosts)).toBe(true);
    });
  });

  describe('getBlogCategories', () => {
    it('should retrieve blog categories', () => {
      const blogCategories = getBlogCategories();
      expect(blogCategories).toBeDefined();
      expect(Array.isArray(blogCategories)).toBe(true);
    });
  });

  describe('getBlogTags', () => {
    it('should retrieve blog tags', () => {
      const blogTags = getBlogTags();
      expect(blogTags).toBeDefined();
      expect(Array.isArray(blogTags)).toBe(true);
    });
  });
});
