import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import styles from './index.module.scss';
import type { FC, ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  label: string;
  toggleNavigation: () => void;
  children: ReactNode;
};

const NavigationContainer: FC<Props> = ({
  label,
  isOpen,
  children,
  toggleNavigation,
}) => {
  const navigationClasses = classnames(styles.navigation, {
    [styles.navigationfixed]: isOpen,
  });

  return (
    <nav aria-label={label} className={navigationClasses} id="main-navigation">
      <button
        type="button"
        className={styles.navigationOpen}
        onClick={toggleNavigation}
        aria-expanded={isOpen}
      >
        <FormattedMessage id="containers.navigation.title" />
      </button>
      {children}
    </nav>
  );
};

export default NavigationContainer;
