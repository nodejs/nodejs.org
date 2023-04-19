import React from 'react';
import type { DropdownItem } from '../../../types';
import css from './index.module.scss';

interface Props {
  items: Array<DropdownItem>;
  shouldShow: boolean;
  styles: Object;
}

const Dropdown = ({ items, shouldShow, styles }: Props) => {
  const mappedElements = items.map(item => {
    const extraStyles = {
      fontWeight: item.active ? 'bold' : 'normal',
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        item.onClick();
      }
    };

    return (
      <li key={`dropdown-item-${item.label}`}>
        <button
          style={extraStyles}
          onClick={item.onClick}
          onKeyDown={handleKeyPress}
          type="button"
        >
          {item.title}
        </button>
      </li>
    );
  });

  return (
    <ul
      className={css.dropdownList}
      style={{ display: shouldShow ? 'block' : 'none', ...styles }}
    >
      {mappedElements}
    </ul>
  );
};

export default Dropdown;
