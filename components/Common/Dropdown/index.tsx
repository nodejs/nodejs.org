import styles from './index.module.scss';
import type { DropdownItem } from '../../../types';
import type { CSSProperties, FC, KeyboardEvent } from 'react';

type DropdownProps = {
  items: Array<DropdownItem>;
  shouldShow: boolean;
  styles: CSSProperties;
};

const Dropdown: FC<DropdownProps> = props => {
  const mappedElements = props.items.map(item => {
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
    display: props.shouldShow ? 'block' : 'none',
    ...props.styles,
  };

  return (
    <ul className={styles.dropdownList} style={dropdownStyles}>
      {mappedElements}
    </ul>
  );
};

export default Dropdown;
