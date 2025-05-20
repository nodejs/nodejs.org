import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen } from '@testing-library/react';

import { isVisible } from '../../../../../../tests/utilities.mjs';

import BlogPostCard from '#site/components/Blog/BlogPostCard';

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

      assert.ok(isVisible(screen.getByRole('article')));
    });

    it('Renders the title prop correctly', () => {
      const { title } = renderBlogPostCard({});

      assert.equal(screen.getAllByText(title).length, 2);

      // title from preview should be ignored as the one from Links
      // and blog card/post are what matter
      assert.equal(
        screen.getAllByText(title)[0].getAttribute('aria-hidden'),
        'true'
      );
    });

    it('Renders the description prop correctly', () => {
      const { description } = renderBlogPostCard({});

      assert.ok(isVisible(screen.getByText(description)));
    });

    [
      { label: 'layouts.blog.categories.vulnerability', type: 'vulnerability' },
      { label: 'layouts.blog.categories.announcements', type: 'announcements' },
      { label: 'layouts.blog.categories.release', type: 'release' },
    ].forEach(({ label, type }) => {
      it(`Renders "${label} text when passing it the type "${type}`, () => {
        renderBlogPostCard({ type });

        assert.ok(isVisible(screen.getByText(label)));
      });
    });

    it('Renders all passed authors fullName(s), comma-separated', () => {
      const authors = ['Jane Doe', 'John Doe'];

      renderBlogPostCard({ authors });

      const fullNames = authors.reduce((prev, curr, index) => {
        if (index === 0) {
          return curr;
        }

        return `${prev}, ${curr}`;
      }, '');

      assert.ok(isVisible(screen.getByText(fullNames)));
    });

    it('Renders all passed authors fullName(s), comma-separated', () => {
      const authors = ['Jane Doe', 'John Doe'];

      renderBlogPostCard({ authors });

      const fullNames = authors.reduce((prev, curr, index) => {
        if (index === 0) {
          return curr;
        }

        return `${prev}, ${curr}`;
      }, '');

      assert.ok(isVisible(screen.getByText(fullNames)));
    });

    it('Renders date prop in short format', () => {
      const date = new Date();

      renderBlogPostCard({ date });

      const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      assert.ok(isVisible(screen.getByText(dateTimeFormat.format(date))));
    });
  });
});
