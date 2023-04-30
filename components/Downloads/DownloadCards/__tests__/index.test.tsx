import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadCards from './../index';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    basePath: '',
  })),
}));

describe('DownloadCards component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <DownloadCards version="v18.15.0" userOS="MAC" />
    );
    expect(container).toMatchSnapshot();
  });

  it('tests click', async () => {
    render(<DownloadCards version="v18.15.0" userOS="MAC" />);
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
    render(<DownloadCards version="v18.15.0" userOS="MAC" />);
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
