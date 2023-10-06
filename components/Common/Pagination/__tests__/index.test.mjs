import { render, screen } from '@testing-library/react';

import Pagination from '@/components/Common/Pagination';

describe('Pagination', () => {
  describe('Rendering', () => {
    it('Renders the navigation buttons even if no pages are passed to it', () => {
      render(<Pagination currentPage={0} pages={[]} />);

      expect(screen.getByRole('navigation')).toBeVisible();

      expect(screen.getByRole('button', { name: /previous/i })).toBeVisible();

      expect(screen.getByRole('button', { name: /next/i })).toBeVisible();
    });

    it('Renders the passed pages and current page', () => {
      const currentPage = 1;

      const pages = [
        {
          url: '1',
        },
        {
          url: '2',
        },
        {
          url: '3',
        },
        {
          url: '4',
        },
      ];

      render(<Pagination currentPage={currentPage} pages={pages} />);

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
      const currentPage = 1;

      const pages = [
        {
          url: '1',
        },
        {
          url: '2',
        },
        {
          url: '3',
        },
        {
          url: '4',
        },
        {
          url: '5',
        },
        {
          url: '6',
        },
        {
          url: '7',
        },
      ];

      render(<Pagination currentPage={currentPage} pages={pages} />);

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
      const currentPage = 1;

      const pages = [
        {
          url: '1',
        },
        {
          url: '2',
        },
        {
          url: '3',
        },
        {
          url: '4',
        },
        {
          url: '5',
        },
        {
          url: '6',
        },
        {
          url: '7',
        },
      ];

      render(<Pagination currentPage={currentPage} pages={pages} />);

      expect(screen.getByText('...')).toBeVisible();
    });
  });

  describe('Logic', () => {
    it('Disables "Previous" button when the currentPage is equal to the first page', () => {
      const currentPage = 1;

      const pages = [
        {
          url: '1',
        },
        {
          url: '2',
        },
      ];

      render(<Pagination currentPage={currentPage} pages={pages} />);

      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    });

    it('Disables "Next" button when the currentPage is equal to the last page', () => {
      const currentPage = 2;

      const pages = [
        {
          url: '1',
        },
        {
          url: '2',
        },
      ];

      render(<Pagination currentPage={currentPage} pages={pages} />);

      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });
  });
});
