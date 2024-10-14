'use client';

import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
import * as Label from '@radix-ui/react-label';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { FC, ComponentProps, HTMLAttributeAnchorTarget } from 'react';

import LanguageDropdown from '@/components/Common/LanguageDropDown';
import ThemeToggle from '@/components/Common/ThemeToggle';
import NavItem from '@/components/Containers/NavBar/NavItem';
import GitHub from '@/components/Icons/Social/GitHub';
import Link from '@/components/Link';
import WithNodejsLogo from '@/components/withNodejsLogo';
import type { FormattedMessage } from '@/types';

import style from './index.module.css';

const SearchButton = dynamic(() => import('@/components/Common/Search'), {
  ssr: false,
});

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
  languages: ComponentProps<typeof LanguageDropdown>;
  onThemeTogglerClick: () => void;
};

const NavBar: FC<NavbarProps> = ({
  navItems,
  languages,
  onThemeTogglerClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`${style.container}`}>
      <div className={style.nodeIconAndMobileItemsToggler}>
        <Link className={style.nodeIconWrapper} href="/" aria-label="Home">
          <WithNodejsLogo />
        </Link>

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
            <NavItem key={link} href={link} target={target}>
              {text}
            </NavItem>
          ))}
        </div>

        <div className={style.actionsWrapper}>
          <SearchButton />

          <ThemeToggle onClick={onThemeTogglerClick} />

          <LanguageDropdown
            onChange={languages.onChange}
            availableLanguages={languages.availableLanguages}
            currentLanguage={languages.currentLanguage}
          />

          <Link
            className={style.ghIconWrapper}
            href="https://github.com/nodejs/node"
            aria-label="Node.js Github"
          >
            <GitHub />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
