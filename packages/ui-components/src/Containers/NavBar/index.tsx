import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
import * as Label from '@radix-ui/react-label';
import classNames from 'classnames';
import { useState } from 'react';

import NavItem from '#ui/Containers/NavBar/NavItem';

import type { FormattedMessage, LinkLike } from '#ui/types';
import type {
  FC,
  HTMLAttributeAnchorTarget,
  PropsWithChildren,
  ElementType,
} from 'react';

import styles from './index.module.css';

const navInteractionIcons = {
  show: <Hamburger className={styles.navInteractionIcon} />,
  close: <XMark className={styles.navInteractionIcon} />,
};

type NavbarProps = {
  navItems?: Array<{
    text: FormattedMessage;
    link: string;
    target?: HTMLAttributeAnchorTarget | undefined;
  }>;
  Logo: ElementType;
  as: LinkLike;
  pathname: string;
  sidebarItemTogglerAriaLabel: string;
};

const NavBar: FC<PropsWithChildren<NavbarProps>> = ({
  children,
  Logo,
  as: Component = 'a',
  navItems,
  pathname,
  sidebarItemTogglerAriaLabel,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.nodeIconAndMobileItemsToggler}>
          <Component
            className={styles.nodeIconWrapper}
            href="/"
            aria-label="Home"
          >
            <Logo />
          </Component>

          <Label.Root
            className={styles.sidebarItemTogglerLabel}
            htmlFor="sidebarItemToggler"
            role="button"
            aria-label={sidebarItemTogglerAriaLabel}
          >
            {navInteractionIcons[isMenuOpen ? 'close' : 'show']}
          </Label.Root>
        </div>

        <input
          className={classNames('peer', styles.sidebarItemToggler)}
          id="sidebarItemToggler"
          type="checkbox"
          onChange={e => setIsMenuOpen(() => e.target.checked)}
          aria-label={sidebarItemTogglerAriaLabel}
          tabIndex={-1}
        />

        <div className={classNames(styles.main, `hidden peer-checked:flex`)}>
          {navItems && (
            <div className={styles.navItems}>
              {navItems.map(({ text, link, target }) => (
                <NavItem
                  pathname={pathname}
                  as={Component}
                  key={link}
                  href={link}
                  target={target}
                >
                  {text}
                </NavItem>
              ))}
            </div>
          )}
          <div className={styles.actionsWrapper}>{children}</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
