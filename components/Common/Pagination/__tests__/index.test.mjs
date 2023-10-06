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
  });
});
