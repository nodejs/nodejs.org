import React, { RefObject } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from '..';

describe('Dropdown component', () => {
  const ref = {
    current: {} as HTMLDivElement,
  } as RefObject<HTMLDivElement>;
  const onClick = jest.fn();
  const mockData = [
    {
      title: 'English',
      label: 'English',
      onClick,
    },
    {
      title: 'Kazakh',
      label: 'Kazakh',
      onClick,
    },
  ];

  it('renders correctly', () => {
    const { container } = render(
      <Dropdown items={mockData} shouldShow elementRef={ref} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should be visible', () => {
    render(<Dropdown items={mockData} shouldShow elementRef={ref} />);

    expect(screen.getByRole('list')).toBeVisible();
  });

  it('should be hidden', () => {
    render(<Dropdown items={mockData} shouldShow={false} elementRef={ref} />);

    expect(screen.getByRole('list', { hidden: true })).not.toBeVisible();
  });

  it('click on list item should be triggered', async () => {
    render(<Dropdown items={mockData} shouldShow elementRef={ref} />);

    const listItem: Element = screen.getAllByRole('button')[0] as Element;
    await userEvent.click(listItem);
    expect(onClick).toHaveBeenCalled();
  });
});
