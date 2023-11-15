'use client';

import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
import * as Label from '@radix-ui/react-label';
import { useState } from 'react';
import type { FC, ComponentProps } from 'react';

import LanguageDropdown from '@/components/Common/LanguageDropDown';
import ThemeToggle from '@/components/Common/ThemeToggle';
import NavItem from '@/components/Containers/NavItem';
import GithubLogo from '@/components/Icons/GitHubLogo';
import NodejsLogoDark from '@/components/Icons/NodejsLogoDark';
import NodejsLogoLight from '@/components/Icons/NodejsLogoLight';

import style from './index.module.css';

type NavItem = { text: string; href: string };

type NavbarProps = {
  navItems: NavItem[];
  languages: ComponentProps<typeof LanguageDropdown>;
  onThemeTogglerClick: () => void;
};

const navInteractionIcons = {
  show: <Hamburger className={style.navInteractionIcon} />,
  close: <XMark className={style.navInteractionIcon} />,
};

const NavigationBar: FC<NavbarProps> = ({
  navItems,
  languages,
  onThemeTogglerClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className={`${style.container}`}>
      <div className={style.nodeIconAndMobileItemsToggler}>
        <div className={style.nodeIconWrapper}>
          <NodejsLogoDark className={style.nodejsLogoDark} />
          <NodejsLogoLight className={style.nodejsLogoLight} />
        </div>
        <Label.Root
          onClick={() => setIsMenuOpen(prev => !prev)}
          className={style.sidebarItemTogglerLabel}
          htmlFor="sidebarItemToggler"
        >
          {navInteractionIcons[isMenuOpen ? 'close' : 'show']}
        </Label.Root>
      </div>
      <input className="peer hidden" id="sidebarItemToggler" type="checkbox" />
      <div className={`${style.main} peer-checked:block`}>
        <div className={style.navItems}>
          {navItems.map(({ text, href }) => (
            <NavItem key={text} href={href}>
              {text}
            </NavItem>
          ))}
        </div>
        <div className={style.actionsWrapper}>
          <ThemeToggle onClick={onThemeTogglerClick} />
          <LanguageDropdown
            availableLanguages={languages.availableLanguages}
            currentLanguage={languages.currentLanguage}
          />
          <a
            className={style.ghIconWrapper}
            href="https://github.com/nodejs/node"
          >
            <GithubLogo />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
