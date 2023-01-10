import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames';

import LocalisedLink from './LocalisedLink';
import { useLocale } from '../hooks/useLocale';
import { linkWithLocale } from '../util/linkWithLocale';

import navigation from '../navigation.json';
import LanguagePickerSvg from './LanguagePickerSvg';

const Header = () => {
  const { currentLocale, availableLocales } = useLocale();
  const { asPath } = useRouter();

  const localisedLink = linkWithLocale(currentLocale.code);

  const getLinkClassName = (href: string) =>
    classNames({ active: asPath === localisedLink(href) });

  return (
    <header aria-label="Primary">
      <div className="container">
        <LocalisedLink href="/" className="logo">
          <Image
            priority
            width="111"
            height="33"
            src="/static/images/logo.svg"
            alt="Node.js"
          />
        </LocalisedLink>

        <nav aria-label="primary">
          <ul className="list-divider-pipe">
            {navigation.map(item => (
              <li
                key={item.translationId}
                className={getLinkClassName(item.link)}
              >
                <LocalisedLink href={item.link}>
                  <FormattedMessage id={item.translationId} />
                </LocalisedLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="switchers">
          <button
            className="dark-theme-switcher"
            type="button"
            title="{{site.toggleText}}"
            aria-label="Toggle dark/light mode"
          />
          <button
            className="lang-picker-toggler"
            type="button"
            aria-controls="lang-picker"
            aria-expanded="false"
          >
            <LanguagePickerSvg />
            <span className="sr-only">Toggle Language</span>
          </button>
        </div>

        <ul id="lang-picker" className="lang-picker hidden">
          {availableLocales.map(locale => (
            <li key={locale.code}>
              <button data-lang={locale.code} title={locale.name}>
                {locale.localName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
