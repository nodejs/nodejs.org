'use client';

import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
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

const navMenuId = 'navbar-menu';

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

          <button
            className={styles.sidebarItemTogglerButton}
            type="button"
            aria-label={sidebarItemTogglerAriaLabel}
            aria-controls={navMenuId}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(isOpen => !isOpen)}
          >
            {navInteractionIcons[isMenuOpen ? 'close' : 'show']}
          </button>
        </div>

        <div
          id={navMenuId}
          className={classNames(
            styles.main,
            isMenuOpen ? 'flex' : 'hidden xl:flex'
          )}
        >
          {navItems && navItems.length > 0 && (
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
