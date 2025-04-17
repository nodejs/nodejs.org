import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen } from '@testing-library/react';

import { isVisible } from '../../../../../../tests/utilities.mjs';

import PaginationListItem from '@node-core/ui-components/Common/BasePagination/PaginationListItem';

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

    assert.ok(isVisible());
    assert.equal(listItem.getAttribute('aria-posinset'), String(pageNumber));
    assert.equal(listItem.getAttribute('aria-setsize'), String(totalPages));

    assert.equal(screen.getByRole('link').getAttribute('href'), url);
  });

  it('Assigns aria-current="page" attribute to the link when the current page is equal to the page number', () => {
    renderPaginationListItem({
      url: 'http://',
      currentPage: 1,
      pageNumber: 1,
      totalPages: 10,
    });

    assert.equal(screen.getByRole('link').getAttribute('aria-current'), 'page');
  });
});
