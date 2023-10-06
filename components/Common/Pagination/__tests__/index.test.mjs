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
  });
});
