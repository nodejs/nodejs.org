import { render, screen } from '@testing-library/react';

import Pagination from '@/components/Common/Pagination';

function setUpTest({ currentPage = 1, pageCount }) {
  const pages = new Array(pageCount).fill({ url: 'page' });

  render(<Pagination currentPage={currentPage} pages={pages} />);

  return {
    currentPage,
    pages,
  };
}

describe('Pagination', () => {
  describe('Rendering', () => {
    it('Renders the navigation buttons even if no pages are passed to it', () => {
      setUpTest({ currentPage: 0, pageCount: 0 });

      expect(screen.getByRole('navigation')).toBeVisible();

      expect(screen.getByRole('button', { name: /previous/i })).toBeVisible();

      expect(screen.getByRole('button', { name: /next/i })).toBeVisible();
    });

    it('Renders the passed pages and current page', () => {
      const { currentPage, pages } = setUpTest({
        pageCount: 4,
      });

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(pages.length);

      pageElements.forEach((page, index) => {
        if (index + 1 === currentPage) {
          expect(page).toHaveAttribute('aria-current', 'page');
        }

        expect(page).toBeVisible();
      });
    });

    it('Renders only six pages at the same time', () => {
      setUpTest({
        pageCount: 7,
      });

      const pageElements = screen.getAllByRole('link');

      expect(pageElements).toHaveLength(6);

      expect(pageElements.map(element => element.innerHTML)).toEqual([
        '1',
        '2',
        '3',
        '5',
        '6',
        '7',
      ]);
    });

    it('Shows an ellipsis when there are more than 6 pages', () => {
      setUpTest({
        pageCount: 7,
      });

      expect(screen.getByText('...')).toBeVisible();
    });
  });

  describe('Logic', () => {
    it('Disables "Previous" button when the currentPage is equal to the first page', () => {
      setUpTest({
        pageCount: 2,
      });

      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    });

    it('Disables "Next" button when the currentPage is equal to the last page', () => {
      setUpTest({
        currentPage: 2,
        pageCount: 2,
      });

      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });
  });
});
