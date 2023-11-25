import { render, screen } from '@testing-library/react';

import BlogPostCard from '@/components/Common/BlogPostCard';

function renderBlogPostCard({
  title = 'Blog post title',
  type = 'vulnerability',
  description = 'Blog post description',
  authors = [],
  date = new Date(),
}) {
  render(
    <BlogPostCard
      title={title}
      type={type}
      description={description}
      authors={authors}
      date={date}
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

      // Title from Preview component
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        title
      );

      // The second title should be hidden for screen-readers
      // to prevent them from reading it twice
      expect(screen.getAllByText(title)[1]).toHaveAttribute(
        'aria-hidden',
        'true'
      );
    });

    it('Renders the description prop correctly', () => {
      const { description } = renderBlogPostCard({});

      expect(screen.getByText(description)).toBeVisible();
    });

    it.each([
      { label: 'components.common.card.vulnerability', type: 'vulnerability' },
      { label: 'components.common.card.announcement', type: 'announcement' },
      { label: 'components.common.card.release', type: 'release' },
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
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      expect(screen.getByText(dateTimeFormat.format(date))).toBeVisible();
    });
  });
});
