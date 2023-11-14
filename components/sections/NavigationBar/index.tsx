import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
import * as Label from '@radix-ui/react-label';
import classNames from 'classnames';
import { type FC, type ComponentProps, useState } from 'react';

import LanguageDropdown from '@/components/Common/LanguageDropDown';
import ThemeToggle from '@/components/Common/ThemeToggle';
import GithubLogo from '@/components/Icons/GitHubLogo';
import NodejsLogoDark from '@/components/Icons/NodejsLogoDark';
import NodejsLogoLight from '@/components/Icons/NodejsLogoLight';
import NavItem from '@/components/sections/NavItem';

import style from './index.module.css';

type NavItem = { text: string; href: string };

type NavbarProps = {
  navItems: NavItem[];
  currentNavItem: string;
  languages: ComponentProps<typeof LanguageDropdown>;
  onThemeTogglerClick: () => void;
};

const navInteractionIcons = {
  show: <Hamburger className={style.navInteractionIcon} />,
  close: <XMark className={style.navInteractionIcon} />,
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
      <div className={style.nodeIconAndMobileItemsToggler}>
        <div className={style.nodeIconWrapper}>
          <NodejsLogoDark className="h-6 w-20 dark:hidden" />
          <NodejsLogoLight className="hidden h-6 w-20 dark:block" />
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
                'bg-green-600': currentNavItem === text,
              })}
              key={text}
              href={href}
            >
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
          <a href="https://github.com/nodejs/node">
            <button className={style.ghIconWrapper} aria-label="Node.js Github">
              <GithubLogo />
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
