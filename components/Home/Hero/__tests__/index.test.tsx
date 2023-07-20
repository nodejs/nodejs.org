import type { NodeRelease } from '@/types';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Hero from '..';
import { createNodeReleases } from '@/components/__fixtures__/nodeReleases';

jest.mock('../../../../hooks/useDetectOS');

const releases = createNodeReleases();
const currentLTS = releases.find(release => release.isLts) as NodeRelease;
const currentRelease = releases.find(
  release => release.status === 'Current'
) as NodeRelease;

describe('Hero component', () => {
  it('renders the title', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Hero
          title="Welcome to Node.js"
          ltsVersion={currentLTS?.versionWithPrefix}
          currentVersion={currentRelease?.versionWithPrefix}
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
          ltsVersion={currentLTS?.versionWithPrefix}
          currentVersion={currentRelease?.versionWithPrefix}
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
          ltsVersion={currentLTS?.versionWithPrefix}
          currentVersion={currentRelease?.versionWithPrefix}
        />
      </IntlProvider>
    );
    const ltsDownloadButton = screen.getAllByRole('link')[0];
    expect(ltsDownloadButton).toHaveAttribute(
      'href',
      `https://nodejs.org/dist/${currentLTS.versionWithPrefix}/node-${currentLTS.versionWithPrefix}-x64.msi`
    );
  });

  it('renders the "Get Current" link with the current version', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Hero
          title="Welcome to Node.js"
          ltsVersion={currentLTS?.versionWithPrefix}
          currentVersion={currentRelease?.versionWithPrefix}
        />
      </IntlProvider>
    );
    const currentVersionLink = screen.getAllByRole('link')[1];
    expect(currentVersionLink).toHaveAttribute(
      'href',
      `https://nodejs.org/dist/${currentRelease.versionWithPrefix}/node-${currentRelease.versionWithPrefix}-x64.msi`
    );
  });

  it('renders the "Learn more" link', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Hero
          title="Welcome to Node.js"
          ltsVersion={currentLTS?.versionWithPrefix}
          currentVersion={currentRelease?.versionWithPrefix}
        />
      </IntlProvider>
    );
    const learnMoreLink = screen.getAllByRole('link')[2];
    expect(learnMoreLink).toHaveAttribute('href', '/learn');
  });
});
