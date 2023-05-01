import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import DownloadHeader from '../';
import { createNodeReleasesData } from '../../../../__fixtures__/page';

describe('DownloadHeader component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <DownloadHeader release={createNodeReleasesData()[0]} />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
