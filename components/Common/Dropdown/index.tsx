import { forwardRef } from 'react';
import type { DropdownItem } from '@/types';
import type { CSSProperties, KeyboardEvent, PropsWithChildren } from 'react';

import styles from './index.module.scss';

type DropdownProps = PropsWithChildren<{
  items: Array<DropdownItem>;
  shouldShow: boolean;
  styles: CSSProperties;
}>;

const Dropdown = forwardRef<HTMLUListElement, DropdownProps>(
  ({ items, shouldShow, styles: extraStyles, children }, ref) => {
    const mappedElements = items.map(item => {
      const extraStyles = { fontWeight: item.active ? 'bold' : 'normal' };

      const handleKeyPress = (e: KeyboardEvent<HTMLButtonElement>) => {
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

    const dropdownStyles = {
      display: shouldShow ? 'block' : 'none',
      ...extraStyles,
    };

    return (
      <>
        <ul ref={ref} className={styles.dropdownList} style={dropdownStyles}>
          {mappedElements}
        </ul>

        {children}
      </>
    );
  }
);

Dropdown.displayName = 'DropdownWithRef';

export default Dropdown;
