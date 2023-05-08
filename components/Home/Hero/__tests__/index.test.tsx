import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Hero from '..';
import type { NodeReleaseData } from '../../../../types';

const mockNodeReleaseData: NodeReleaseData[] = [
  {
    version: '14.17.0',
    fullVersion: 'v14.17.0',
    codename: 'Fermium',
    isLts: true,
    status: 'Maintenance LTS',
    initialRelease: '2021-05-18',
    ltsStart: '2020-10-27',
    maintenanceStart: '2021-10-19',
    endOfLife: '2023-04-01',
  },
  {
    version: '16.0.0',
    fullVersion: 'v16.0.0',
    codename: 'Gallium',
    isLts: false,
    status: 'Current',
    initialRelease: '2021-04-20',
    ltsStart: null,
    maintenanceStart: null,
    endOfLife: '2022-10-01',
  },
];

jest.mock('../../../../hooks/useDetectOS', () => ({
  useDetectOS: jest.fn().mockReturnValue({
    getDownloadLink: (version: string) => `/download/node/${version}`,
  }),
}));

describe('Hero component', () => {
  it('renders the title', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Hero
          title="Welcome to Node.js"
          nodeReleaseData={mockNodeReleaseData}
        />
      </IntlProvider>
    );
    expect(screen.getByText('Welcome to Node.js')).toBeInTheDocument();
  });

  it('renders the subtitle when passed', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Hero
          title="Welcome to Node.js"
          subTitle="Node.js is Javascript run-time environment"
          nodeReleaseData={mockNodeReleaseData}
        />
      </IntlProvider>
    );
    expect(
      screen.getByText('Node.js is Javascript run-time environment')
    ).toBeInTheDocument();
  });

  it('renders the "Download LTS" button with the current LTS version', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Hero
          title="Welcome to Node.js"
          nodeReleaseData={mockNodeReleaseData}
        />
      </IntlProvider>
    );
    const ltsDownloadButton = screen.getAllByRole('link')[0];
    expect(ltsDownloadButton).toHaveAttribute(
      'href',
      '/download/node/v14.17.0'
    );
  });

  it('renders the "Get Current" link with the current version', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Hero
          title="Welcome to Node.js"
          nodeReleaseData={mockNodeReleaseData}
        />
      </IntlProvider>
    );
    const currentVersionLink = screen.getAllByRole('link')[1];
    expect(currentVersionLink).toHaveAttribute(
      'href',
      '/download/node/v16.0.0'
    );
  });

  it('renders the "Learn more" link', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Hero
          title="Welcome to Node.js"
          nodeReleaseData={mockNodeReleaseData}
        />
      </IntlProvider>
    );
    const learnMoreLink = screen.getAllByRole('link')[2];
    expect(learnMoreLink).toHaveAttribute('href', '/learn');
  });
});
