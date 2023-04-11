import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from '..';
import { AppProps, WebsiteBanner } from '../../../../types';
import '@testing-library/jest-dom';
import { LocaleProvider } from '../../../../providers/localeProvider';

jest.mock('isomorphic-dompurify', () => ({
  sanitize: jest.fn((html: string) => html),
}));

const bannersIndex: WebsiteBanner = {
  endDate: '',
  link: 'test/banner/link',
  text: 'Test banner text',
  startDate: '',
};

const i18nData = { currentLocale: { code: 'en' } } as AppProps['i18nData'];

describe('Tests for Header component', () => {
  it('renders when today between startDate and endDate', () => {
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() - 1);
    const afterToday = new Date();
    afterToday.setDate(afterToday.getDate() + 1);

    bannersIndex.startDate = beforeToday.toISOString();
    bannersIndex.endDate = afterToday.toISOString();

    render(
      <LocaleProvider i18nData={i18nData}>
        <Banner bannersIndex={bannersIndex} />
      </LocaleProvider>
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
      <LocaleProvider i18nData={i18nData}>
        <Banner bannersIndex={bannersIndex} />
      </LocaleProvider>
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
      <LocaleProvider i18nData={i18nData}>
        <Banner bannersIndex={bannersIndex} />
      </LocaleProvider>
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
      <LocaleProvider i18nData={i18nData}>
        <Banner bannersIndex={bannersIndex} />
      </LocaleProvider>
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
      <LocaleProvider i18nData={i18nData}>
        <Banner bannersIndex={bannersIndex} />
      </LocaleProvider>
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
      <LocaleProvider i18nData={i18nData}>
        <Banner bannersIndex={bannersIndex} />
      </LocaleProvider>
    );

    const bannerImage = screen.getByTestId('test-image');
    expect(bannerImage).toBeInTheDocument();
  });
});
