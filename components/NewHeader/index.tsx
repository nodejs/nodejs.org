import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
// import { LocalizedLink as Link } from 'gatsby-theme-i18n';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';
// import { ReactComponent as LogoLight } from '../../images/logos/nodejs-logo-light-mode.svg';
// import { ReactComponent as LogoDark } from '../../images/logos/nodejs-logo-dark-mode.svg';
// import { CommonComponents } from '../../components';
// import lightLogo from 'public/static/images/logo.svg';
// import darkLogo from 'public/static/images/logo-dark.svg';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import styles from './index.module.scss';
import LanguageSelector from '../Common/LanguageSelector';
import DarkModeToggle from '../Common/DarkModeToggle';

const Header = () => (
  <nav aria-label="Primary" className={styles.header}>
    <div className={styles.container}>
      <div className={styles.startWrapper}>
        <Link href="/" aria-label="Homepage">
          <div className={styles.logo}>
            <div>
              <Image
                src={'static/images/logo.svg'}
                alt="light-logo"
                className="light-mode-only"
                width="111"
                height="33"
              />
            </div>
            <div>
              <Image
                src={'static/images/logo-dark.svg'}
                alt="dark-logo"
                className="dark-mode-only"
                width="111"
                height="33"
              />
            </div>
          </div>
        </Link>
      </div>

      <ul className={styles.tabs}>
        {/* <li>
          <Link
            href="/learn/"
          // activeClassName={styles.active}
          // partiallyActive
          >
            <FormattedMessage id="components.header.links.learn" />
          </Link>
        </li> */}
        <li>
          <Link
            href="/about/"
          // activeClassName={styles.active}
          // partiallyActive
          >
            <FormattedMessage id="components.header.links.about" />
          </Link>
        </li>
        <li>
          <Link
            href="/api/"
          // activeClassName={styles.active}
          // partiallyActive
          >
            <FormattedMessage id="components.header.links.docs" />
          </Link>
        </li>
        <li>
          <Link
            href="/download/"
          // activeClassName={styles.active}
          // partiallyActive
          >
            <FormattedMessage id="components.header.links.download" />
          </Link>
        </li>
        <li>
          <a href="https://openjsf.org/certification/">
            <FormattedMessage id="components.header.links.certification" />
          </a>
        </li>
      </ul>

      <div className={styles.endWrapper}>
        <ul className={styles.rightContainer}>
          <li className={styles.searchBar}>
            <span className="sr-only">Search Bar</span>
            {/* <CommonComponents.SearchBar /> */}
            <MdSearch />
          </li>

          <li>
            <DarkModeToggle />
          </li>

          <li>
            <LanguageSelector />
          </li>

          <li>
            <a
              target="_blank"
              href="https://github.com/nodejs/nodejs.dev"
              rel="noopener noreferrer"
            >
              <span className="sr-only">GitHub</span>
              <FaGithub />
              {/* <FontAwesomeIcon
                icon={faGithub}
                color="var(--color-text-accent)"
                style={{ padding: '1rem', width: '2rem', height: '2rem' }}
              /> */}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;