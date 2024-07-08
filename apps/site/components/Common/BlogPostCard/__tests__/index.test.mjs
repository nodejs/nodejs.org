import { render, screen } from '@testing-library/react';

import BlogPostCard from '@/components/Common/BlogPostCard';

function renderBlogPostCard({
  title = 'Blog post title',
  type = 'vulnerability',
  description = 'Blog post description',
  authors = [],
  date = new Date(),
  slug = '',
}) {
  render(
    <BlogPostCard
      title={title}
      category={type}
      description={description}
      authors={authors}
      date={date}
      slug={slug}
    />
  );

  return { title, type, description, authors, date };
}

describe('BlogPostCard', () => {
  describe('Rendering', () => {
    it('Wraps the entire card within an article', () => {
      renderBlogPostCard({});

      expect(screen.getByRole('article')).toBeVisible();
    });

    it('Renders the title prop correctly', () => {
      const { title } = renderBlogPostCard({});

      expect(screen.getAllByText(title).length).toBe(2);

      // title from preview should be ignored as the one from Links
      // and blog card/post are what matter
      expect(screen.getAllByText(title)[0]).toHaveAttribute(
        'aria-hidden',
        'true'
      );
    });

    it('Renders the description prop correctly', () => {
      const { description } = renderBlogPostCard({});

      expect(screen.getByText(description)).toBeVisible();
    });

    it.each([
      { label: 'layouts.blog.categories.vulnerability', type: 'vulnerability' },
      { label: 'layouts.blog.categories.announcements', type: 'announcements' },
      { label: 'layouts.blog.categories.release', type: 'release' },
    ])(
      'Renders "%label" text when passing it the type "%type"',
      ({ label, type }) => {
        renderBlogPostCard({ type });

        expect(screen.getByText(label)).toBeVisible();
      }
    );

    it('Renders all passed authors fullName(s), comma-separated', () => {
      const authors = [
        { fullName: 'Jane Doe', src: '' },
        { fullName: 'John Doe', src: '' },
      ];

      renderBlogPostCard({ authors });

      const fullNames = authors.reduce((prev, curr, index) => {
        if (index === 0) {
          return curr.fullName;
        }

        return `${prev}, ${curr.fullName}`;
      }, '');

      expect(screen.getByText(fullNames)).toBeVisible();
    });

    it('Renders all passed authors fullName(s), comma-separated', () => {
      const authors = [
        { fullName: 'Jane Doe', src: '' },
        { fullName: 'John Doe', src: '' },
      ];

      renderBlogPostCard({ authors });

      const fullNames = authors.reduce((prev, curr, index) => {
        if (index === 0) {
          return curr.fullName;
        }

        return `${prev}, ${curr.fullName}`;
      }, '');

      expect(screen.getByText(fullNames)).toBeVisible();
    });

    it('Renders date prop in short format', () => {
      const date = new Date();

      renderBlogPostCard({ date });

      const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      expect(screen.getByText(dateTimeFormat.format(date))).toBeVisible();
    });
  });
});
