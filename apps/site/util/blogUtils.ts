import type { BlogPreviewType } from '@/types';

export const mapBlogCategoryToPreviewType = (type: string): BlogPreviewType => {
  switch (type) {
    case 'announcements':
    case 'release':
    case 'vulnerability':
      return type;
    case 'events':
      return 'announcements';
    default:
      return 'announcements';
  }
};
