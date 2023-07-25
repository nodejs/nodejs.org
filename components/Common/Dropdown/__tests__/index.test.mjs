import { fireEvent, render, screen } from '@testing-library/react';
import Dropdown from '..';

describe('Dropdown component', () => {
  const items = [
    { label: 'item1', title: 'Item 1', active: false, onClick: jest.fn() },
    { label: 'item2', title: 'Item 2', active: true, onClick: jest.fn() },
    { label: 'item3', title: 'Item 3', active: false, onClick: jest.fn() },
  ];

  it('should render the items and apply active styles', () => {
    render(<Dropdown items={items} shouldShow={true} styles={{}} />);

    items.forEach(item => {
      const button = screen.getByText(item.title);
      expect(button).toBeInTheDocument();

      if (item.active) {
        expect(button).toHaveStyle('font-weight: bold');
      } else {
        expect(button).not.toHaveStyle('font-weight: bold');
      }
    });
  });

  it('should call the onClick function when an item is clicked', () => {
    render(<Dropdown items={items} shouldShow={true} styles={{}} />);
    const button = screen.getByText(items[2].title);
    fireEvent.click(button);
    expect(items[2].onClick).toHaveBeenCalledTimes(1);
  });

  it('should call the onClick function when Enter or Space is pressed', () => {
    render(<Dropdown items={items} shouldShow={true} styles={{}} />);
    const button = screen.getByText(items[1].title);
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(items[1].onClick).toHaveBeenCalledTimes(2);
  });

  it('should not render the items when shouldShow prop is false', () => {
    render(<Dropdown items={items} shouldShow={false} styles={{}} />);
    items.forEach(item => {
      const button = screen.queryByText(item.title);
      expect(button).not.toBeVisible();
    });
  });

  it('should apply styles passed in the styles prop', () => {
    const customStyles = {
      backgroundColor: 'green',
      padding: '10px',
      borderRadius: '5px',
    };

    render(<Dropdown items={items} shouldShow={true} styles={customStyles} />);

    const dropdownList = screen.getByRole('list');
    expect(dropdownList).toHaveStyle('background-color: green');
    expect(dropdownList).toHaveStyle('padding: 10px');
    expect(dropdownList).toHaveStyle('border-radius: 5px');
  });
});
