import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen } from '@testing-library/react';

// @ts-ignore this file is intentionally stored outside of the `rootDir`
import { isVisible } from '../../../../../../tests/utilities.mjs';

import BasePagination from '#ui/Common/BasePagination';

const getPageLabel = number => number.toString();
const labels = {
  aria: 'Aria',
  prevAria: 'Previous Aria',
  prev: 'Previous',
  nextAria: 'Next Aria',
  next: 'Next',
};

function renderPagination({
  currentPage = 1,
  pages,
  currentPageSiblingsCount,
}) {
  const parsedPages = new Array(pages)
    .fill({ url: 'page' })
    .map(item => ({ url: `${item.url}-${Math.random()}` }));

  render(
    <BasePagination
      currentPage={currentPage}
      pages={parsedPages}
      currentPageSiblingsCount={currentPageSiblingsCount}
      getPageLabel={getPageLabel}
      labels={labels}
    />
  );

  return {
    currentPage,
    parsedPages,
  };
}

describe('Pagination', () => {
  describe('Rendering', () => {
    it('Renders the navigation buttons even if no pages are passed to it', () => {
      renderPagination({ currentPage: 0, pages: 0 });

      assert.ok(isVisible(screen.getByRole('navigation')));
      assert.ok(
        isVisible(
          screen.getByRole('button', {
            name: labels.prevAria,
          })
        )
      );
      assert.ok(
        isVisible(
          screen.getByRole('button', {
            name: labels.nextAria,
          })
        )
      );
    });

    it('Renders the passed pages and current page', () => {
      const { currentPage, parsedPages } = renderPagination({
        pages: 4,
      });

      const pageElements = screen.getAllByRole('link');

      assert.equal(pageElements.length, parsedPages.length);

      pageElements.forEach((page, index) => {
        if (index + 1 === currentPage) {
          assert.strictEqual(page.getAttribute('aria-current'), 'page');
        }

        assert.ok(isVisible(page));
      });
    });
  });

  describe('Ellipsis behavior', () => {
    it('When the pages size is equal or smaller than currentPageSiblingsCount + 5, all pages are shown', () => {
      renderPagination({
        pages: 6,
      });

      assert.ok(!screen.queryByText('...')?.ownerDocument);

      const pageElements = screen.getAllByRole('link');

      assert.deepEqual(
        pageElements.map(element => element.textContent),
        ['1', '2', '3', '4', '5', '6']
      );
    });

    it('Shows left ellipsis when the left sibling of the current page is at least two pages away from the first page', () => {
      renderPagination({
        currentPage: 5,
        pages: 8,
      });

      assert.ok(isVisible(screen.getByText('...')));

      const pageElements = screen.getAllByRole('link');

      assert.deepEqual(
        pageElements.map(element => element.textContent),
        ['1', '4', '5', '6', '7', '8']
      );
    });

    it('Shows right ellipsis when the right sibling of the current page is at least two pages away from the last page', () => {
      renderPagination({
        currentPage: 3,
        pages: 8,
      });

      assert.ok(isVisible(screen.getByText('...')));

      const pageElements = screen.getAllByRole('link');

      assert.deepEqual(
        pageElements.map(element => element.textContent),
        ['1', '2', '3', '4', '5', '8']
      );
    });

    it('Shows right and left ellipses when the current page siblings are both at least two pages away from the first and last pages', () => {
      renderPagination({
        currentPage: 5,
        pages: 10,
      });

      assert.equal(screen.getAllByText('...').length, 2);

      const pageElements = screen.getAllByRole('link');

      assert.deepEqual(
        pageElements.map(element => element.textContent),
        ['1', '4', '5', '6', '10']
      );
    });
  });

  describe('Navigation buttons', () => {
    it('Disables "Previous" button when the currentPage is equal to the first page', () => {
      renderPagination({
        pages: 2,
      });

      assert.ok(
        screen
          .getByRole('button', {
            name: labels.prevAria,
          })
          .getAttribute('aria-disabled')
      );
    });

    it('Disables "Next" button when the currentPage is equal to the last page', () => {
      renderPagination({
        currentPage: 2,
        pages: 2,
      });

      assert.ok(
        screen
          .getByRole('button', {
            name: labels.nextAria,
          })
          .getAttribute('aria-disabled')
      );
    });
  });
});
