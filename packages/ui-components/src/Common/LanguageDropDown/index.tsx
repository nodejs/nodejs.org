import { LanguageIcon } from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';

import type { SimpleLocaleConfig } from '#ui/types';
import type { AnchorHTMLAttributes, FC, JSXElementConstructor } from 'react';

import styles from './index.module.css';

// A link that renders `href` in the given `locale`, as the `Link` of i18n routers
type LocaleLinkLike = JSXElementConstructor<
  AnchorHTMLAttributes<HTMLAnchorElement> & { locale: string }
>;

type LanguageDropDownProps = {
  href: string;
  as: LocaleLinkLike;
  currentLanguage: string;
  availableLanguages: Array<SimpleLocaleConfig>;
  ariaLabel: string;
};

const LanguageDropdown: FC<LanguageDropDownProps> = ({
  href,
  as: Component,
  currentLanguage,
  availableLanguages,
  ariaLabel,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.languageDropdown} aria-label={ariaLabel}>
          <LanguageIcon height="20" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className={styles.dropDownContent}
          sideOffset={5}
        >
          <div>
            {availableLanguages.map(({ name, code, localName, hrefLang }) => (
              <DropdownMenu.Item key={code} asChild>
                <Component
                  href={href}
                  locale={code}
                  hrefLang={hrefLang}
                  aria-label={name}
                  className={classNames(styles.dropDownItem, {
                    [styles.currentDropDown]: code === currentLanguage,
                  })}
                >
                  <span lang={hrefLang} aria-hidden="true">
                    {localName}
                  </span>
                </Component>
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default LanguageDropdown;
