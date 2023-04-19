import React from 'react';
import type { DropdownItem } from '../../../types';
import styles from './index.module.scss';

export interface DropdownProps {
  items: Array<DropdownItem>;
  shouldShow: boolean;
  styles: Object;
}

const Dropdown = ({ items, shouldShow, styles: css }: DropdownProps) => {
  const mappedElements =
    items &&
    items.map(item => {
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
      className={styles.dropdownList}
      style={{ display: shouldShow ? 'block' : 'none', ...css }}
    >
      {mappedElements}
    </ul>
  );
};

export default Dropdown;
