import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Banner from '../index';
import type { WebsiteBanner } from '../../../../types';

jest.mock('isomorphic-dompurify', () => ({
  sanitize: jest.fn((html: string) => html),
}));

const bannersIndex: WebsiteBanner = {
  endDate: '',
  link: 'test/banner/link',
  text: 'Test banner text',
  startDate: '',
};

describe('Tests for Header component', () => {
  it('renders when today between startDate and endDate', () => {
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() - 1);
    const afterToday = new Date();
    afterToday.setDate(afterToday.getDate() + 1);

    bannersIndex.startDate = beforeToday.toISOString();
    bannersIndex.endDate = afterToday.toISOString();

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Banner bannersIndex={bannersIndex} />
      </IntlProvider>
    );

    const bannerText = screen.getByText(bannersIndex.text || '');
    expect(bannerText).toBeInTheDocument();
  });

  it('does not render when today before startDate', () => {
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() + 1);
    const afterToday = new Date();
    afterToday.setDate(afterToday.getDate() + 2);

    bannersIndex.startDate = beforeToday.toISOString();
    bannersIndex.endDate = afterToday.toISOString();

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Banner bannersIndex={bannersIndex} />
      </IntlProvider>
    );

    const bannerText = screen.queryByText(bannersIndex.text || '');
    expect(bannerText).not.toBeInTheDocument();
  });

  it('does not render when today after endDate', () => {
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() - 2);
    const afterToday = new Date();
    afterToday.setDate(afterToday.getDate() - 1);

    bannersIndex.startDate = beforeToday.toISOString();
    bannersIndex.endDate = afterToday.toISOString();

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Banner bannersIndex={bannersIndex} />
      </IntlProvider>
    );

    const bannerText = screen.queryByText(bannersIndex.text || '');
    expect(bannerText).not.toBeInTheDocument();
  });

  it('should use the supplied relative link', () => {
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() - 1);
    const afterToday = new Date();
    afterToday.setDate(afterToday.getDate() + 1);

    bannersIndex.startDate = beforeToday.toISOString();
    bannersIndex.endDate = afterToday.toISOString();
    bannersIndex.link = 'foo/bar';

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Banner bannersIndex={bannersIndex} />
      </IntlProvider>
    );

    const bannerText = screen.getByText(bannersIndex.text || '');
    expect(bannerText).toBeInTheDocument();

    const bannerLink = bannerText.innerHTML;
    expect(bannerLink).toMatch('http://nodejs.org/foo/bar');
  });

  it('should use the supplied absolute link', () => {
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() - 1);
    const afterToday = new Date();
    afterToday.setDate(afterToday.getDate() + 1);

    bannersIndex.startDate = beforeToday.toISOString();
    bannersIndex.endDate = afterToday.toISOString();
    bannersIndex.link = 'https://nodejs.org/en/an-absolute-content';

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Banner bannersIndex={bannersIndex} />
      </IntlProvider>
    );

    const bannerText = screen.getByText(bannersIndex.text || '');
    expect(bannerText).toBeInTheDocument();

    const bannerLink = bannerText.innerHTML;
    expect(bannerLink).toMatch('https://nodejs.org/en/an-absolute-content');
  });

  it('should display html content correctly', () => {
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() - 1);
    const afterToday = new Date();
    afterToday.setDate(afterToday.getDate() + 1);

    bannersIndex.startDate = beforeToday.toISOString();
    bannersIndex.endDate = afterToday.toISOString();
    bannersIndex.link = 'https://nodejs.org/en/an-absolute-content';
    bannersIndex.text = undefined;
    bannersIndex.html =
      '<img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" data-testid="test-image" />';

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Banner bannersIndex={bannersIndex} />
      </IntlProvider>
    );

    const bannerImage = screen.getByTestId('test-image');
    expect(bannerImage).toBeInTheDocument();
  });
});
