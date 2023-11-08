import { render, screen } from '@testing-library/react';

import PaginationListItem from '@/components/Common/Pagination/PaginationListItem';

function renderPaginationListItem({
  url,
  pageNumber,
  currentPage,
  totalPages,
}) {
  render(
    <PaginationListItem
      url={url}
      pageNumber={pageNumber}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}

describe('PaginationListItem', () => {
  it('Renders the list item correctly, including the corresponding ARIA attributes', () => {
    const pageNumber = 1;
    const totalPages = 10;
    const url = 'http://';

    renderPaginationListItem({
      url,
      currentPage: 1,
      pageNumber,
      totalPages,
    });

    const listItem = screen.getByRole('listitem');

    expect(listItem).toBeVisible();
    expect(listItem).toHaveAttribute('aria-posinset', String(pageNumber));
    expect(listItem).toHaveAttribute('aria-setsize', String(totalPages));

    expect(screen.getByRole('link')).toHaveAttribute('href', url);
  });

  it('Assigns aria-current="page" attribute to the link when the current page is equal to the page number', () => {
    renderPaginationListItem({
      url: 'http://',
      currentPage: 1,
      pageNumber: 1,
      totalPages: 10,
    });

    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });
});
