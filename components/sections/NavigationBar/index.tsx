import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
import classNames from 'classnames';
import Image from 'next/image';
import { type FC, type ComponentProps, useState } from 'react';

import LanguageDropdown from '@/components/Common/LanguageDropDown';
import ThemeToggle from '@/components/Common/ThemeToggle';
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

const NavigationBar: FC<NavbarProps> = ({
  navItems,
  currentNavItem,
  languages,
  onThemeTogglerClick,
}) => {
  const [showHamIcon, setShowHamIcon] = useState(true);
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
        <label
          onClick={() => setShowHamIcon(prev => !prev)}
          className={style.sidebarItemTogglerLabel}
          htmlFor="sidebarItemToggler"
        >
          {showHamIcon ? (
            <Hamburger className="h-6 w-6" />
          ) : (
            <XMark className="h-6 w-6" />
          )}
        </label>
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
          <button className={style.ghIconWrapper} aria-label="Node.js Github">
            <a href="https://github.com/nodejs/node">
              <Image
                className="dark:hidden"
                alt="Github Icon"
                width={20}
                height={20}
                src={`${BASE_PATH}/static/images/logos/social-github-dark.svg`}
              />
              <Image
                className="hidden dark:block"
                alt="Github Icon"
                width={20}
                height={20}
                src={`${BASE_PATH}/static/images/logos/social-github.svg`}
              />
            </a>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
