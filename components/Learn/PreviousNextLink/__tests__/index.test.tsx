import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import PrevNextLink from '..';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      isReady: true,
      asPath: '/link',
    };
  },
}));

describe('PrevNextLink component', () => {
  test('renders nothing if neither previous nor next are provided', () => {
    render(<PrevNextLink />);
    const component = screen.findByRole('list');
    expect(component).resolves.not.toBeInTheDocument;
  });

  test('renders previous link if previous is provided', () => {
    const previous = { slug: '/previous-page' };
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <PrevNextLink previous={previous} />
      </IntlProvider>
    );
    const link = screen.findByRole('link');
    expect(link).resolves.toHaveAttribute('href', `/en${previous.slug}`);
  });

  test('renders next link if next is provided', () => {
    const next = { slug: '/next-page' };
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <PrevNextLink next={next} />
      </IntlProvider>
    );
    const link = screen.findByRole('link');
    expect(link).resolves.toHaveAttribute('href', `/en${next.slug}`);
  });

  test('renders both previous and next links if both are provided', async () => {
    const previous = { slug: '/previous-page' };
    const next = { slug: '/next-page' };
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <PrevNextLink previous={previous} next={next} />
      </IntlProvider>
    );
    const links = await screen.findAllByRole('link');
    expect(links[0]).toHaveAttribute('href', `/en${previous.slug}`);
    expect(links[1]).toHaveAttribute('href', `/en${next.slug}`);
  });
});
