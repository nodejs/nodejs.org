import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import PrevNextLink from '..';

describe('PrevNextLink component', () => {
  test('renders nothing if neither previous nor next are provided', () => {
    render(<PrevNextLink />);
    const component = screen.queryByRole('list');
    expect(component).not.toBeInTheDocument;
  });

  test('renders previous link if previous is provided', () => {
    const previous = { slug: '/previous-page' };
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <PrevNextLink previous={previous} />
      </IntlProvider>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', previous.slug);
  });

  test('renders next link if next is provided', () => {
    const next = { slug: '/next-page' };
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <PrevNextLink next={next} />
      </IntlProvider>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', next.slug);
  });

  test('renders both previous and next links if both are provided', () => {
    const previous = { slug: '/previous-page' };
    const next = { slug: '/next-page' };
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <PrevNextLink previous={previous} next={next} />
      </IntlProvider>
    );
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', previous.slug);
    expect(links[1]).toHaveAttribute('href', next.slug);
  });
});
