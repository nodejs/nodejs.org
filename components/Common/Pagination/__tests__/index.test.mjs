import { render, screen } from '@testing-library/react';

import Pagination from '@/components/Common/Pagination';

function setUpTest({ currentPage = 1, pages, currentPageSiblingsCount }) {
  const parsedPages = new Array(pages).fill({ url: 'page' });

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
      setUpTest({ currentPage: 0, pages: 0 });

      expect(screen.getByRole('navigation')).toBeVisible();

      expect(screen.getByRole('button', { name: /previous/i })).toBeVisible();

      expect(screen.getByRole('button', { name: /next/i })).toBeVisible();
    });

    it('Renders the passed pages and current page', () => {
      const { currentPage, parsedPages } = setUpTest({
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
      setUpTest({
        pages: 6,
      });

      expect(screen.queryByText('...')).not.toBeInTheDocument();

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(6);

      expect(pageElements.map(element => element.innerHTML)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
      ]);
    });

    it('Shows left ellipsis when the left sibling of the current page is at least two pages away from the first page', () => {
      setUpTest({
        currentPage: 5,
        pages: 7,
      });

      expect(screen.getByText('...')).toBeVisible();

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(6);

      expect(pageElements.map(element => element.innerHTML)).toEqual([
        '1',
        '3',
        '4',
        '5',
        '6',
        '7',
      ]);
    });

    it('Shows right ellipsis when the right sibling of the current page is at least two pages away from the last page', () => {
      setUpTest({
        currentPage: 3,
        pages: 7,
      });

      expect(screen.getByText('...')).toBeVisible();

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(6);

      expect(pageElements.map(element => element.innerHTML)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '7',
      ]);
    });

    it('Shows right and left ellipses when the current page siblings are both at least two pages away from the first and last pages', () => {
      setUpTest({
        currentPage: 5,
        pages: 9,
      });

      expect(screen.getAllByText('...')).toHaveLength(2);

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(5);

      expect(pageElements.map(element => element.innerHTML)).toEqual([
        '1',
        '4',
        '5',
        '6',
        '9',
      ]);
    });
  });

  describe('Navigation buttons', () => {
    it('Disables "Previous" button when the currentPage is equal to the first page', () => {
      setUpTest({
        pages: 2,
      });

      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    });

    it('Disables "Next" button when the currentPage is equal to the last page', () => {
      setUpTest({
        currentPage: 2,
        pages: 2,
      });

      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });
  });
});
