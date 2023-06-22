import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import styles from './index.module.scss';
import type { FC, PropsWithChildren } from 'react';

type NavigationContainerProps = PropsWithChildren<{
  isOpen: boolean;
  label: string;
  toggleNavigation: () => void;
}>;

const NavigationContainer: FC<NavigationContainerProps> = ({
  label,
  isOpen,
  children,
  toggleNavigation,
}) => {
  const navigationClasses = classnames(styles.navigation, {
    [styles.navigationFixed]: isOpen,
  });

  return (
    <nav aria-label={label} className={navigationClasses} id="main-navigation">
      <button
        type="button"
        className={styles.navigationOpen}
        onClick={toggleNavigation}
        aria-expanded={isOpen}
      >
        <FormattedMessage id="components.navigation.navigationContainer" />
      </button>
      {children}
    </nav>
  );
};

export default NavigationContainer;
