import { render, screen } from '@testing-library/react';

import BlogHeader from '@/components/Blog/BlogHeader';

describe('BlogHeader', () => {
  it('should have correct href when category is all', async () => {
    const AwaitedBlogHeader = await BlogHeader({ category: 'all' });
    render(AwaitedBlogHeader);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/feed/blog.xml');
  });

  it('should have correct href when category is release', async () => {
    const AwaitedBlogHeader = await BlogHeader({ category: 'release' });
    render(AwaitedBlogHeader);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/feed/releases.xml');
  });

  it('should have correct href when category is vulnerability', async () => {
    const AwaitedBlogHeader = await BlogHeader({ category: 'vulnerability' });
    render(AwaitedBlogHeader);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/feed/vulnerability.xml');
  });

  it('should have correct href when category is random', async () => {
    const AwaitedBlogHeader = await BlogHeader({ category: 'random' });
    render(AwaitedBlogHeader);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/feed/blog.xml');
  });
});
