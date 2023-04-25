import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import BlogCard from '..';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({}),
}));

jest.mock('../../../../hooks/useLocale', () => ({
  useLocale: jest.fn().mockReturnValue({
    currentLocale: {},
  }),
}));

describe('BlogCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <BlogCard
          author="Bat Man"
          category="category-mock"
          date="2023-04-21 23:40:56.77"
          slug="/blog/category-mock/sample-blog"
          title="Sample Test Blog"
          readingTime="1 min read"
        />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
