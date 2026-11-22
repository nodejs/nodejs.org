import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
import * as Label from '@radix-ui/react-label';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

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

// Picks the longest nav link that prefixes the current path, so `/about` and `/about/sponsors` never highlight together.
export const getActiveNavLink = (
  navItems: Array<{ link: string }>,
  pathname: string
): string =>
  navItems.reduce((longest, { link }) => {
    const isMatch =
      link.startsWith('/') &&
      (pathname === link || pathname.startsWith(`${link}/`));
    return isMatch && link.length > longest.length ? link : longest;
  }, '');

type NavbarProps = {
  navItems?: Array<{
    text: FormattedMessage;
    link: string;
    target?: HTMLAttributeAnchorTarget | undefined;
    accent?: boolean;
  }>;
  Logo?: ElementType;
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

  const activeLink = getActiveNavLink(navItems ?? [], pathname);

  useEffect(() => {
    if (!isMenuOpen || window.matchMedia('(min-width: 1280px)').matches) {
      return;
    }

    const scrollPosition = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const { body } = document;
    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.width = previousStyles.width;
      body.style.overflow = previousStyles.overflow;
      body.style.paddingRight = previousStyles.paddingRight;
      window.scrollTo(0, scrollPosition);
    };
  }, [isMenuOpen]);

  return (
    <nav className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.nodeIconAndMobileItemsToggler}>
          {Logo && (
            <Component
              className={styles.nodeIconWrapper}
              href="/"
              aria-label="Home"
            >
              <Logo />
            </Component>
          )}

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
          {navItems && navItems.length > 0 && (
            <div className={styles.navItems}>
              {navItems.map(({ text, link, target, accent }) => (
                <NavItem
                  pathname={pathname}
                  active={link === activeLink}
                  as={Component}
                  key={link}
                  href={link}
                  target={target}
                  accent={accent}
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
