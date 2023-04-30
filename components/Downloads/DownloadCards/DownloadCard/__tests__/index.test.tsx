import { render } from '@testing-library/react';
import DownloadCard from './../index';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    basePath: '',
  })),
}));

describe('DownloadCard component', () => {
  it('selected renders correctly', () => {
    const { container } = render(
      <DownloadCard
        name="MAC"
        icon="mac-download-logo.svg"
        label="MAC Installer"
        download="https://nodejs.org/dist/v18.15.0/node-v18.15.0.pkg"
        filename="node-v18.15.0.pkg"
        selected={true}
        onSelect={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('not selected renders correctly', () => {
    const { container } = render(
      <DownloadCard
        name="MAC"
        icon="mac-download-logo.svg"
        label="MAC Installer"
        download="https://nodejs.org/dist/v18.15.0/node-v18.15.0.pkg"
        filename="node-v18.15.0.pkg"
        selected={false}
        onSelect={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
