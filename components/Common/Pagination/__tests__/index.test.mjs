import { render, screen } from '@testing-library/react';

import Pagination from '@/components/Common/Pagination';

function renderPagination({
  currentPage = 1,
  pages,
  currentPageSiblingsCount,
}) {
  const parsedPages = new Array(pages)
    .fill({ url: 'page' })
    .map(item => ({ url: `${item.url}-${Math.random()}` }));

  render(
    <Pagination
      currentPage={currentPage}
      pages={parsedPages}
      currentPageSiblingsCount={currentPageSiblingsCount}
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

      expect(screen.getByRole('navigation')).toBeVisible();

      expect(
        screen.getByRole('button', {
          name: 'components.common.pagination.prevAriaLabel',
        })
      ).toBeVisible();

      expect(
        screen.getByRole('button', {
          name: 'components.common.pagination.nextAriaLabel',
        })
      ).toBeVisible();
    });

    it('Renders the passed pages and current page', () => {
      const { currentPage, parsedPages } = renderPagination({
        pages: 4,
      });

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(parsedPages.length);

      pageElements.forEach((page, index) => {
        if (index + 1 === currentPage) {
          expect(page).toHaveAttribute('aria-current', 'page');
        }

        expect(page).toBeVisible();
      });
    });
  });

  describe('Ellipsis behavior', () => {
    it('When the pages size is equal or smaller than currentPageSiblingsCount + 5, all pages are shown', () => {
      renderPagination({
        pages: 6,
      });

      expect(screen.queryByText('...')).not.toBeInTheDocument();

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(6);

      expect(pageElements.map(element => element.textContent)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
      ]);
    });

    it('Shows left ellipsis when the left sibling of the current page is at least two pages away from the first page', () => {
      renderPagination({
        currentPage: 5,
        pages: 8,
      });

      expect(screen.getByText('...')).toBeVisible();

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(6);

      expect(pageElements.map(element => element.textContent)).toEqual([
        '1',
        '4',
        '5',
        '6',
        '7',
        '8',
      ]);
    });

    it('Shows right ellipsis when the right sibling of the current page is at least two pages away from the last page', () => {
      renderPagination({
        currentPage: 3,
        pages: 8,
      });

      expect(screen.getByText('...')).toBeVisible();

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(6);

      expect(pageElements.map(element => element.textContent)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '8',
      ]);
    });

    it('Shows right and left ellipses when the current page siblings are both at least two pages away from the first and last pages', () => {
      renderPagination({
        currentPage: 5,
        pages: 10,
      });

      expect(screen.getAllByText('...')).toHaveLength(2);

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(5);

      expect(pageElements.map(element => element.textContent)).toEqual([
        '1',
        '4',
        '5',
        '6',
        '10',
      ]);
    });
  });

  describe('Navigation buttons', () => {
    it('Disables "Previous" button when the currentPage is equal to the first page', () => {
      renderPagination({
        pages: 2,
      });

      expect(
        screen.getByRole('button', {
          name: 'components.common.pagination.prevAriaLabel',
        })
      ).toHaveAttribute('aria-disabled');
    });

    it('Disables "Next" button when the currentPage is equal to the last page', () => {
      renderPagination({
        currentPage: 2,
        pages: 2,
      });

      expect(
        screen.getByRole('button', {
          name: 'components.common.pagination.nextAriaLabel',
        })
      ).toHaveAttribute('aria-disabled');
    });
  });
});
