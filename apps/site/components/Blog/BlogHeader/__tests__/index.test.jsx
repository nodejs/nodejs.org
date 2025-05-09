import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen } from '@testing-library/react';

import BlogHeader from '#site/components/Blog/BlogHeader';

describe('BlogHeader', () => {
  it('should have correct href when category is all', () => {
    render(<BlogHeader category="all" />);
    const link = screen.getByRole('link');
    assert.equal(link.getAttribute('href'), '/feed/blog.xml');
  });

  it('should have correct href when category is release', () => {
    render(<BlogHeader category="release" />);
    const link = screen.getByRole('link');
    assert.equal(link.getAttribute('href'), '/feed/releases.xml');
  });

  it('should have correct href when category is vulnerability', () => {
    render(<BlogHeader category="vulnerability" />);
    const link = screen.getByRole('link');
    assert.equal(link.getAttribute('href'), '/feed/vulnerability.xml');
  });

  it('should have correct href when category is random', () => {
    render(<BlogHeader category="random" />);
    const link = screen.getByRole('link');
    assert.equal(link.getAttribute('href'), '/feed/blog.xml');
  });
});
