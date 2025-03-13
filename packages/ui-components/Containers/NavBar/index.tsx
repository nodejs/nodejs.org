'use client';

import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
import * as Label from '@radix-ui/react-label';
import classNames from 'classnames';
import { useState } from 'react';
import type {
  FC,
  HTMLAttributeAnchorTarget,
  PropsWithChildren,
  ElementType,
} from 'react';

import NavItem from '@node-core/ui-components/Containers/NavBar/NavItem';
import type {
  FormattedMessage,
  LinkLike,
} from '@node-core/ui-components/types';

import style from './index.module.css';

const navInteractionIcons = {
  show: <Hamburger className={style.navInteractionIcon} />,
  close: <XMark className={style.navInteractionIcon} />,
};

type NavbarProps = {
  navItems: Array<{
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
    <nav className={`${style.container}`}>
      <div className={style.nodeIconAndMobileItemsToggler}>
        <Component className={style.nodeIconWrapper} href="/" aria-label="Home">
          <Logo />
        </Component>

        <Label.Root
          className={classNames(['peer', style.sidebarItemToggler])}
          htmlFor="sidebarItemToggler"
        >
          {navInteractionIcons[isMenuOpen ? 'close' : 'show']}
        </Label.Root>
      </div>

      <input
        className={classNames(['peer', style.sidebarItemToggler])}
        id="sidebarItemToggler"
        type="checkbox"
        onChange={e => setIsMenuOpen(() => e.target.checked)}
        aria-label={sidebarItemTogglerAriaLabel}
      />

      <div className={`${style.main} peer-checked:flex`}>
        <div className={style.navItems}>
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

        <div className={style.actionsWrapper}>{children}</div>
      </div>
    </nav>
  );
};

export default NavBar;
