import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import PrevNextLink from '..';
import messages from '../../../../i18n/locales/en.json';

describe('PrevNextLink component', () => {
  test('renders nothing if neither previous nor next are provided', () => {
    render(<PrevNextLink />);
    const component = screen.queryByRole('list');
    expect(component).not.toBeInTheDocument;
  });

  test('renders previous link if previous is provided', () => {
    const previous = { slug: '/previous-page' };
    render(
      <IntlProvider locale="en" messages={messages}>
        <PrevNextLink previous={previous} />
      </IntlProvider>
    );
    expect(screen.getByText(/PREV/)).toHaveAttribute('href', previous.slug);
  });

  test('renders next link if next is provided', () => {
    const next = { slug: '/next-page' };
    render(
      <IntlProvider locale="en" messages={messages}>
        <PrevNextLink next={next} />
      </IntlProvider>
    );
    expect(screen.getByText(/NEXT/)).toHaveAttribute('href', next.slug);
  });

  test('renders both previous and next links if both are provided', () => {
    const previous = { slug: '/previous-page' };
    const next = { slug: '/next-page' };
    render(
      <IntlProvider locale="en" messages={messages}>
        <PrevNextLink previous={previous} next={next} />
      </IntlProvider>
    );
    expect(screen.getByText(/PREV/)).toHaveAttribute('href', previous.slug);
    expect(screen.getByText(/NEXT/)).toHaveAttribute('href', next.slug);
  });
});
