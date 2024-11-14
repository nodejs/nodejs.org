'use client';

import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
import * as Label from '@radix-ui/react-label';
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
  LinkWrapper: LinkLike;
  pathname: string;
};

const NavBar: FC<PropsWithChildren<NavbarProps>> = ({
  children,
  Logo,
  LinkWrapper,
  navItems,
  pathname,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`${style.container}`}>
      <div className={style.nodeIconAndMobileItemsToggler}>
        <LinkWrapper
          className={style.nodeIconWrapper}
          href="/"
          aria-label="Home"
        >
          <Logo />
        </LinkWrapper>

        <Label.Root
          onClick={() => setIsMenuOpen(prev => !prev)}
          className={style.sidebarItemTogglerLabel}
          htmlFor="sidebarItemToggler"
        >
          {navInteractionIcons[isMenuOpen ? 'close' : 'show']}
        </Label.Root>
      </div>

      <input className="peer hidden" id="sidebarItemToggler" type="checkbox" />

      <div className={`${style.main} peer-checked:flex`}>
        <div className={style.navItems}>
          {navItems.map(({ text, link, target }) => (
            <NavItem
              pathname={pathname}
              Wrapper={LinkWrapper}
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
