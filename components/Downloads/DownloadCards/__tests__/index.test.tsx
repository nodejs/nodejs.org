import { createNodeReleases } from '@/components/__fixtures__/nodeReleases';
import { NodeReleasesContext } from '@/providers/nodeReleasesProvider';
import { WithNodeRelease } from '@/providers/withNodeRelease';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadCards from './../index';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    basePath: '',
  })),
}));

jest.mock('../../../../hooks/useDetectOS', () => ({
  useDetectOS: jest.fn().mockImplementation(() => ({
    os: 'MAC',
    bitness: 64,
  })),
}));

const mockNodeReleases = createNodeReleases();

describe('DownloadCards component', () => {
  it('tests click', async () => {
    render(
      <NodeReleasesContext.Provider value={mockNodeReleases}>
        <WithNodeRelease status="Active LTS">
          {({ release }) => <DownloadCards {...release} />}
        </WithNodeRelease>
      </NodeReleasesContext.Provider>
    );
    const listElements = screen.getAllByRole('tab');

    expect(listElements.length).toEqual(3);
    expect(listElements[0]).toHaveClass('downloadCard');
    expect(listElements[1]).toHaveClass('downloadCard downloadCardActive');
    expect(listElements[2]).toHaveClass('downloadCard');

    await userEvent.click(listElements[0]);
    expect(listElements[0]).toHaveClass('downloadCard downloadCardActive');
    expect(listElements[1]).toHaveClass('downloadCard');
    expect(listElements[2]).toHaveClass('downloadCard');
  });

  it('tests keyboard events', () => {
    render(
      <NodeReleasesContext.Provider value={mockNodeReleases}>
        <WithNodeRelease status="Active LTS">
          {({ release }) => <DownloadCards {...release} />}
        </WithNodeRelease>
      </NodeReleasesContext.Provider>
    );
    const tabListElement = screen.getByRole('tablist');
    const listElements = screen.getAllByRole('tab');

    expect(listElements.length).toEqual(3);
    expect(listElements[0]).toHaveClass('downloadCard');
    expect(listElements[1]).toHaveClass('downloadCard downloadCardActive');
    expect(listElements[2]).toHaveClass('downloadCard');

    // WIN <-MAC SOURCECODE
    fireEvent.keyDown(tabListElement, {
      key: 'ArrowLeft',
      code: 'ArrowLeft',
    });
    expect(listElements[0]).toHaveClass('downloadCard downloadCardActive');
    expect(listElements[1]).toHaveClass('downloadCard');
    expect(listElements[2]).toHaveClass('downloadCard');

    // <-WIN MAC SOURCECODE
    fireEvent.keyDown(tabListElement, {
      key: 'ArrowLeft',
      code: 'ArrowLeft',
    });
    expect(listElements[0]).toHaveClass('downloadCard');
    expect(listElements[1]).toHaveClass('downloadCard');
    expect(listElements[2]).toHaveClass('downloadCard downloadCardActive');

    // WIN MAC SOURCECODE->
    fireEvent.keyDown(tabListElement, {
      key: 'ArrowRight',
      code: 'ArrowRight',
    });
    expect(listElements[0]).toHaveClass('downloadCard downloadCardActive');
    expect(listElements[1]).toHaveClass('downloadCard');
    expect(listElements[2]).toHaveClass('downloadCard');
  });
});
