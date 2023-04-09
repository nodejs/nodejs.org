import React, { useRef } from 'react';
import { useElementPositionAndSize } from '../../../hooks/useElementPositionAndSize';
import { computeDropdownStyles } from './computeDropdownStyles';
import { DropdownItem } from '../../../types';
import styles from './index.module.scss';

interface Props<T> {
  items: Array<DropdownItem>;
  shouldShow: boolean;
  elementRef: React.RefObject<T>;
}

const Dropdown = <T extends HTMLElement>({
  items,
  shouldShow,
  elementRef,
}: Props<T>): JSX.Element | null => {
  const outerElementPosition = useElementPositionAndSize(elementRef);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const mappedElements = items.map(item => {
    const extraStyles = {
      fontWeight: (item.active ? 'bold' : 'normal') as 'bold' | 'normal',
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

  const dropdownWidth = dropdownRef.current?.offsetWidth || 0;

  const listStyle = computeDropdownStyles(
    outerElementPosition,
    dropdownWidth,
    shouldShow
  );

  return (
    <ul ref={dropdownRef} className={styles.dropdownList} style={listStyle}>
      {mappedElements}
    </ul>
  );
};

export default Dropdown;
