import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
import * as Label from '@radix-ui/react-label';
import classNames from 'classnames';
import Image from 'next/image';
import { type FC, type ComponentProps, useState } from 'react';

import LanguageDropdown from '@/components/Common/LanguageDropDown';
import ThemeToggle from '@/components/Common/ThemeToggle';
import Github from '@/components/Icons/Github';
import NavItem from '@/components/sections/NavItem';
import { BASE_PATH } from '@/next.constants.mjs';

import style from './index.module.css';
type NavItem = { text: string; href: string };

type NavbarProps = {
  navItems: NavItem[];
  currentNavItem: string;
  languages: ComponentProps<typeof LanguageDropdown>;
  onThemeTogglerClick: () => void;
};

const navInteractionIcons = {
  show: <Hamburger className="h-6 w-6" />,
  close: <XMark className="h-6 w-6" />,
};

const NavigationBar: FC<NavbarProps> = ({
  navItems,
  currentNavItem,
  languages,
  onThemeTogglerClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className={style.container}>
      <div className={style.leftItems}>
        <div className={style.nodeIconWrapper}>
          <Image
            className="dark:hidden"
            height={24}
            width={80}
            src={`${BASE_PATH}/static/images/logos/horizontal-dark.svg`}
            alt="Node.js"
          />
          <Image
            className="hidden dark:block"
            height={24}
            width={80}
            src={`${BASE_PATH}/static/images/logos/horizontal-light.svg`}
            alt="Node.js"
          />
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
            <NavItem
              className={classNames('md:bg-transparent', {
                'bg-green-600 !text-white': currentNavItem === text,
              })}
              key={text}
              href={href}
            >
              {text}
            </NavItem>
          ))}
        </div>
        <div className={style.rightItems}>
          <ThemeToggle onClick={onThemeTogglerClick} />
          <LanguageDropdown
            availableLanguages={languages.availableLanguages}
            currentLanguage={languages.currentLanguage}
          />
          <a href="https://github.com/nodejs/node">
            <button className={style.ghIconWrapper} aria-label="Node.js Github">
              <Github size={20} />
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
