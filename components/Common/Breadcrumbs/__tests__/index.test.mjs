import { render } from '@testing-library/react';

import Breadcrumbs from '..';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Breadcrumbs', () => {
  it('renders a list of links when provided', () => {
    const { container } = render(
      <Breadcrumbs
        links={[
          {
            label: 'Learn',
            href: '/learn',
          },
          {
            label: 'Getting Started',
            href: '/learn/getting-started',
          },
          {
            label: 'Introduction to Node.js',
            href: '/learn/getting-started/intro',
          },
        ]}
      />
    );

    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAccessibleName('breadcrumb');

    const ol = nav.querySelector('ol');
    expect(ol).toBeInTheDocument();

    const li = ol.querySelectorAll('li');
    expect(li).toHaveLength(4);

    const firstItem = li.item(0);

    const homeIcon = firstItem.querySelector('svg[aria-label="Home"]');
    expect(homeIcon).toHaveAttribute('aria-label', 'Home');

    const lastItem = li.item(li.length - 1);

    const link = lastItem.querySelector('a');
    expect(link).toHaveAttribute('aria-current', 'page');

    const separator = lastItem.querySelector('svg');
    expect(lastItem).not.toContainElement(separator);
  });

  it('renders ellipsis if links provided more than maxLength specified', () => {
    const { container } = render(
      <Breadcrumbs
        links={[
          {
            label: 'Learn',
            href: '/learn',
          },
          {
            label: 'Getting Started',
            href: '/learn/getting-started',
          },
          {
            label: 'Introduction to Node.js',
            href: '/learn/getting-started/intro',
          },
        ]}
        maxLength={1}
      />
    );

    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAccessibleName('breadcrumb');

    const ol = nav.querySelector('ol');
    expect(ol).toBeInTheDocument();

    const li = ol.querySelectorAll('li');
    expect(li).toHaveLength(3);

    const firstItem = li.item(0);

    const homeIcon = firstItem.querySelector('svg[aria-label="Home"]');
    expect(homeIcon).toHaveAttribute('aria-label', 'Home');

    const truncatedItem = li.item(1);

    const button = truncatedItem.querySelector('button');
    expect(button).toHaveTextContent('...');
    expect(button).toBeDisabled();

    const lastItem = li.item(li.length - 1);

    const link = lastItem.querySelector('a');
    expect(link).toHaveAttribute('aria-current', 'page');

    const separator = lastItem.querySelector('svg');
    expect(lastItem).not.toContainElement(separator);
  });

  it('renders a list of links without home if hideHome is true', () => {
    const { container } = render(
      <Breadcrumbs
        links={[
          {
            label: 'Learn',
            href: '/learn',
          },
          {
            label: 'Getting Started',
            href: '/learn/getting-started',
          },
          {
            label: 'Introduction to Node.js',
            href: '/learn/getting-started/intro',
          },
        ]}
        hideHome
      />
    );

    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAccessibleName('breadcrumb');

    const ol = nav.querySelector('ol');
    expect(ol).toBeInTheDocument();

    const li = ol.querySelectorAll('li');
    expect(li).toHaveLength(3);

    const firstItem = li.item(0);

    const homeIcon = firstItem.querySelector('svg[aria-label="Home"]');
    expect(homeIcon).not.toBeInTheDocument();

    const lastItem = li.item(li.length - 1);

    const link = lastItem.querySelector('a');
    expect(link).toHaveAttribute('aria-current', 'page');

    const separator = lastItem.querySelector('svg');
    expect(lastItem).not.toContainElement(separator);
  });
});
