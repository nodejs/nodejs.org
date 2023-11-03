import Image from 'next/image';
import type { FC, ComponentProps } from 'react';

import LanguageDropdown from '@/components/Common/LanguageDropDown';
import ThemeToggle from '@/components/Common/ThemeToggle';
import NavItem from '@/components/sections/NavItem';

import style from './index.module.css';

type NavItem = { text: string; href: string };

type NavbarProps = {
  navItems: NavItem[];
  languages: ComponentProps<typeof LanguageDropdown>;
  onThemeTogglerClick: () => void;
};

const Navbar: FC<NavbarProps> = ({
  navItems,
  languages,
  onThemeTogglerClick,
}) => {
  return (
    <nav className={style.container}>
      <div className={style.leftItems}>
        <Image
          className="dark:hidden"
          height={24}
          width={80}
          src="/static/images/logos/horizontal-dark.svg"
          alt="Node.js"
        />
        <Image
          className="hidden dark:block"
          height={24}
          width={80}
          src="/static/images/logos/horizontal-light.svg"
          alt="Node.js"
        />
        <div className={style.navItems}>
          {navItems.map(({ text, href }) => (
            <NavItem key={text} href={href}>
              {text}
            </NavItem>
          ))}
        </div>
      </div>
      <div className={style.rightItems}>
        <ThemeToggle onClick={onThemeTogglerClick} />
        <LanguageDropdown
          availableLanguages={languages.availableLanguages}
          currentLanguage={languages.currentLanguage}
        />
        <button className={style.iconWrapper} aria-label="Node.js Github">
          <a href="https://github.com/nodejs/node">
            <Image
              className="dark:hidden"
              alt="Github Icon"
              width={20}
              height={20}
              src="/static/images/logos/social-github-dark.svg"
            />
            <Image
              className="hidden dark:block"
              alt="Github Icon"
              width={20}
              height={20}
              src="/static/images/logos/social-github.svg"
            />
          </a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
