import { render } from '@testing-library/react';
import { LocaleProvider } from '../../../../providers/localeProvider';
import englishMessages from '../../../../i18n/locales/en.json';
import BlogCard from '..';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({}),
}));

describe('BlogCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LocaleProvider
        i18nData={{
          currentLocale: {
            code: 'en',
            localName: 'English',
            name: 'English',
            langDir: 'ltr',
            dateFormat: 'MM.DD.YYYY',
            hrefLang: 'en-US',
            enabled: true,
          },
          localeMessages: englishMessages,
        }}
      >
        <BlogCard
          author="Bat Man"
          category="category-mock"
          date="2023-04-21 23:40:56.77"
          slug="/blog/category-mock/sample-blog"
          title="Sample Test Blog"
        />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
